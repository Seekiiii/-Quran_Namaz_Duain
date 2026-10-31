/* ============================================================
   offline-quran.js — lets the user download the whole Quran text
   (Arabic Uthmani + IndoPak, Urdu and English translations) once,
   and read it later without internet.

   Safety: everything is validated before it is saved
   (114 surahs, 6236 ayahs, the same ayah count in every edition).
   If anything does not match, NOTHING is saved and an error is shown.
   Recitation audio is NOT included (it still needs internet).
   ============================================================ */
const OfflineQuran = (function(){
  const CACHE = 'deen-aasan-quran-v1';
  const KEY = '__quran-offline-v1.json';
  const FLAG = 'deenaasan_quran_offline_v1';
  const TOTAL_AYAHS = 6236;
  const URLS = {
    uthmani: 'https://api.alquran.cloud/v1/quran/quran-uthmani',
    urdu:    'https://api.alquran.cloud/v1/quran/ur.jalandhry',
    english: 'https://api.alquran.cloud/v1/quran/en.sahih',
    indopak: 'https://raw.githubusercontent.com/fawazahmed0/quran-api/1/editions/ara-quranindopak.json'
  };
  let memory = null;

  function supported(){
    try{ return typeof caches !== 'undefined' && typeof localStorage !== 'undefined' && typeof Response !== 'undefined'; }
    catch(e){ return false; }
  }
  function isReady(){
    try{ return localStorage.getItem(FLAG) === '1'; }catch(e){ return false; }
  }

  async function fetchJson(url){
    const res = await fetch(url, {cache: 'no-store'});
    if(!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  // AlQuran Cloud "whole Quran" response -> compact arrays, with strict checks
  function compactApi(json, label){
    const surahs = json && json.data && json.data.surahs;
    if(!Array.isArray(surahs) || surahs.length !== 114) throw new Error(label + ': expected 114 surahs');
    let total = 0;
    const out = surahs.map((s, i) => {
      if(s.number !== i + 1 || !Array.isArray(s.ayahs)) throw new Error(label + ': unexpected data at surah ' + (i + 1));
      total += s.ayahs.length;
      return {
        n: s.number, name: s.name, en: s.englishName, tr: s.englishNameTranslation, type: s.revelationType,
        g: s.ayahs.map(a => a.number),
        t: s.ayahs.map(a => a.text)
      };
    });
    if(total !== TOTAL_AYAHS) throw new Error(label + ': expected ' + TOTAL_AYAHS + ' ayahs but got ' + total);
    return out;
  }

  function compactIndopak(json, uth){
    const q = json && json.quran;
    if(!Array.isArray(q) || q.length !== TOTAL_AYAHS) throw new Error('IndoPak text: expected ' + TOTAL_AYAHS + ' ayahs');
    const out = [];
    for(let i = 0; i < 114; i++) out.push([]);
    q.forEach(e => {
      const c = e.chapter - 1;
      if(!out[c] || !(e.verse >= 1)) throw new Error('IndoPak text: unexpected entry');
      out[c][e.verse - 1] = e.text;
    });
    out.forEach((arr, i) => {
      if(arr.length !== uth[i].t.length || arr.includes(undefined)) throw new Error('IndoPak text does not match surah ' + (i + 1));
    });
    return out;
  }

  async function download(onProgress){
    if(!supported()) throw new Error('This browser cannot store files for offline use.');
    const step = (n) => { if(onProgress) onProgress(n, 4); };

    step(1); const uth = compactApi(await fetchJson(URLS.uthmani), 'Arabic text');
    step(2); const urd = compactApi(await fetchJson(URLS.urdu), 'Urdu translation');
    step(3); const eng = compactApi(await fetchJson(URLS.english), 'English translation');
    step(4); const ind = compactIndopak(await fetchJson(URLS.indopak), uth);

    for(let i = 0; i < 114; i++){
      if(uth[i].t.length !== urd[i].t.length || uth[i].t.length !== eng[i].t.length){
        throw new Error('The translations do not match the Arabic text in surah ' + (i + 1));
      }
    }

    const body = JSON.stringify({v: 1, uthmani: uth, urdu: urd, english: eng, indopak: ind});
    const cache = await caches.open(CACHE);
    await cache.put(KEY, new Response(body, {headers: {'Content-Type': 'application/json'}}));
    try{ localStorage.setItem(FLAG, '1'); }catch(e){ throw new Error('Could not save the download status.'); }
    memory = null;
    try{ if(navigator.storage && navigator.storage.persist) navigator.storage.persist(); }catch(e){}
    return body.length;
  }

  async function load(){
    if(memory) return memory;
    if(!isReady() || !supported()) return null;
    try{
      const cache = await caches.open(CACHE);
      const res = await cache.match(KEY);
      if(!res){ try{ localStorage.removeItem(FLAG); }catch(e){} return null; }
      memory = await res.json();
      return memory;
    }catch(e){ return null; }
  }

  async function remove(){
    memory = null;
    try{ localStorage.removeItem(FLAG); }catch(e){}
    try{ await caches.delete(CACHE); }catch(e){}
  }

  // Same shape that the live API returns, so the app can use it directly
  async function getSurah(n){
    const p = await load();
    if(!p) return null;
    const u = p.uthmani[n - 1], ur = p.urdu[n - 1], en = p.english[n - 1];
    if(!u || !ur || !en) return null;
    const ay = (src) => src.t.map((t, i) => ({number: src.g[i], numberInSurah: i + 1, text: t}));
    return {
      arabicEd: {name: u.name, englishName: u.en, englishNameTranslation: u.tr, revelationType: u.type, numberOfAyahs: u.t.length, ayahs: ay(u)},
      urduEd: {ayahs: ay(ur)},
      englishEd: {ayahs: ay(en)},
      indopak: (p.indopak[n - 1] || []).map(t => ({text: t}))
    };
  }

  async function getSurahList(){
    const p = await load();
    if(!p) return null;
    return p.uthmani.map(s => ({number: s.n, name: s.name, englishName: s.en, englishNameTranslation: s.tr, numberOfAyahs: s.t.length, revelationType: s.type}));
  }

  return {supported, isReady, download, remove, getSurah, getSurahList};
})();
