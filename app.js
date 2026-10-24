/* ============================================================
   TAB SWITCHING
   ============================================================ */
const tabBtns = document.querySelectorAll('.tab-btn');
const views = {
  home: document.getElementById('view-home'),
  quran: document.getElementById('view-quran'),
  namaz: document.getElementById('view-namaz'),
  duas: document.getElementById('view-duas'),
  more: document.getElementById('view-more'),
  tasbeeh: document.getElementById('view-tasbeeh'),
  qibla: document.getElementById('view-qibla'),
  hijri: document.getElementById('view-hijri'),
  zakat: document.getElementById('view-zakat'),
  qaza: document.getElementById('view-qaza'),
  masjid: document.getElementById('view-masjid'),
  khatm: document.getElementById('view-khatm'),
  mood: document.getElementById('view-mood'),
  nazra: document.getElementById('view-nazra'),
  parent: document.getElementById('view-parent'),
  stories: document.getElementById('view-stories'),
  streak: document.getElementById('view-streak'),
  charity: document.getElementById('view-charity'),
  kalimay: document.getElementById('view-kalimay'),
  asma: document.getElementById('view-asma'),
  ramadan: document.getElementById('view-ramadan'),
  guide: document.getElementById('view-guide'),
  favorites: document.getElementById('view-favorites'),
  settings: document.getElementById('view-settings'),
  about: document.getElementById('view-about'),
};
function goToTab(tab){
  tabBtns.forEach(b=> b.classList.toggle('active', b.dataset.tab === tab));
  Object.entries(views).forEach(([key,v])=> v.classList.toggle('active', key === tab));
}
tabBtns.forEach(btn=>{
  btn.addEventListener('click', ()=> goToTab(btn.dataset.tab));
});
document.querySelectorAll('.quick-tile').forEach(btn=>{
  btn.addEventListener('click', ()=> goToTab(btn.dataset.goto));
});
document.getElementById('homeSetLocationBtn').addEventListener('click', ()=> goToTab('namaz'));
document.getElementById('openTasbeehBtn').addEventListener('click', ()=> goToTab('tasbeeh'));
document.getElementById('backFromTasbeeh').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openQiblaBtn').addEventListener('click', ()=> goToTab('qibla'));
document.getElementById('backFromQibla').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openHijriBtn').addEventListener('click', ()=>{
  goToTab('hijri');
  if(!hijriLoadedOnce) loadHijriCalendar();
});
document.getElementById('backFromHijri').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openZakatBtn').addEventListener('click', ()=> goToTab('zakat'));
document.getElementById('backFromZakat').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openQazaBtn').addEventListener('click', ()=>{
  goToTab('qaza');
  renderQazaList();
});
document.getElementById('backFromQaza').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openMasjidBtn').addEventListener('click', ()=> goToTab('masjid'));
document.getElementById('backFromMasjid').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openKhatmBtn').addEventListener('click', ()=>{
  goToTab('khatm');
  showKhatmEntry();
});
document.getElementById('backFromKhatm').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openMoodBtn').addEventListener('click', ()=>{
  goToTab('mood');
  document.getElementById('moodResultWrap').style.display = 'none';
  document.getElementById('moodPickerWrap').style.display = 'block';
});
document.getElementById('backFromMood').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openNazraBtn').addEventListener('click', ()=>{
  goToTab('nazra');
  renderNazraGrid();
});
document.getElementById('backFromNazra').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openParentBtn').addEventListener('click', ()=>{
  goToTab('parent');
  renderParentDashboard();
});
document.getElementById('backFromParent').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openStoriesBtn').addEventListener('click', ()=>{
  goToTab('stories');
  document.getElementById('storyDetailWrap').style.display = 'none';
  document.getElementById('storiesListWrap').style.display = 'block';
});
document.getElementById('backFromStories').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openStreakBtn').addEventListener('click', ()=>{
  goToTab('streak');
  renderStreak();
});
document.getElementById('backFromStreak').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openCharityBtn').addEventListener('click', ()=>{
  goToTab('charity');
  renderCharityList();
});
document.getElementById('backFromCharity').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openKalimayBtn').addEventListener('click', ()=>{
  goToTab('kalimay');
  renderKalimayList();
});
document.getElementById('backFromKalimay').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openAsmaBtn').addEventListener('click', ()=>{
  goToTab('asma');
  renderAsmaFullList();
});
document.getElementById('backFromAsma').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openRamadanBtn').addEventListener('click', ()=> goToTab('ramadan'));
document.getElementById('backFromRamadan').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openGuideBtn').addEventListener('click', ()=>{
  goToTab('guide');
  document.getElementById('guideDetailWrap').style.display = 'none';
  document.getElementById('guideListWrap').style.display = 'block';
  renderGuideTopics();
});
document.getElementById('backFromGuide').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openFavoritesBtn').addEventListener('click', ()=>{
  goToTab('favorites');
  renderFavoritesList();
});
document.getElementById('backFromFavorites').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openSettingsBtn').addEventListener('click', ()=>{
  goToTab('settings');
  initSettingsView();
});
document.getElementById('backFromSettings').addEventListener('click', ()=> goToTab('more'));
document.getElementById('openAboutBtn').addEventListener('click', ()=>{
  goToTab('about');
  renderAboutContent();
});
document.getElementById('backFromAbout').addEventListener('click', ()=> goToTab('more'));

/* Gregorian + hijri-ish date strip */
document.getElementById('gregorianDate').textContent =
  new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
document.getElementById('homeGreetingDate').textContent =
  new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

/* ============================================================
   HOME: Asma-ul-Husna (name of the day)
   ============================================================ */
const ASMA_UL_HUSNA = [
  {ar:"الرَّحْمَٰنُ", en:"Ar-Rahman — The Most Compassionate", ur:"نہایت رحم والا"},
  {ar:"الرَّحِيمُ", en:"Ar-Raheem — The Most Merciful", ur:"نہایت مہربان"},
  {ar:"الْمَلِكُ", en:"Al-Malik — The King", ur:"بادشاہ"},
  {ar:"الْقُدُّوسُ", en:"Al-Quddus — The Most Sacred", ur:"نہایت پاک"},
  {ar:"السَّلَامُ", en:"As-Salam — The Source of Peace", ur:"سلامتی والا"},
  {ar:"الْمُؤْمِنُ", en:"Al-Mu'min — The Inspirer of Faith", ur:"امن دینے والا"},
  {ar:"الْمُهَيْمِنُ", en:"Al-Muhaymin — The Guardian", ur:"نگہبان"},
  {ar:"الْعَزِيزُ", en:"Al-Aziz — The Victorious", ur:"غالب"},
  {ar:"الْجَبَّارُ", en:"Al-Jabbar — The Compeller", ur:"زبردست"},
  {ar:"الْمُتَكَبِّرُ", en:"Al-Mutakabbir — The Greatest", ur:"بڑائی والا"},
  {ar:"الْخَالِقُ", en:"Al-Khaliq — The Creator", ur:"پیدا کرنے والا"},
  {ar:"الْبَارِئُ", en:"Al-Bari — The Maker of Order", ur:"بغیر نمونہ پیدا کرنے والا"},
  {ar:"الْمُصَوِّرُ", en:"Al-Musawwir — The Shaper of Beauty", ur:"صورت بنانے والا"},
  {ar:"الْغَفَّارُ", en:"Al-Ghaffar — The Repeatedly Forgiving", ur:"بار بار معاف کرنے والا"},
  {ar:"الْقَهَّارُ", en:"Al-Qahhar — The Subduer", ur:"سب پر غالب"},
  {ar:"الْوَهَّابُ", en:"Al-Wahhab — The Bestower", ur:"بہت عطا کرنے والا"},
  {ar:"الرَّزَّاقُ", en:"Ar-Razzaq — The Provider", ur:"رزق دینے والا"},
  {ar:"الْفَتَّاحُ", en:"Al-Fattah — The Opener", ur:"فیصلہ کرنے والا"},
  {ar:"الْعَلِيمُ", en:"Al-'Alim — The Knower of All", ur:"سب کچھ جاننے والا"},
  {ar:"الْقَابِضُ", en:"Al-Qabid — The Withholder", ur:"تنگی دینے والا"},
  {ar:"الْبَاسِطُ", en:"Al-Basit — The Extender", ur:"وسعت دینے والا"},
  {ar:"الْخَافِضُ", en:"Al-Khafid — The Reducer", ur:"پست کرنے والا"},
  {ar:"الرَّافِعُ", en:"Ar-Rafi' — The Exalter", ur:"بلند کرنے والا"},
  {ar:"الْمُعِزُّ", en:"Al-Mu'izz — The Bestower of Honor", ur:"عزت دینے والا"},
  {ar:"الْمُذِلُّ", en:"Al-Mudhill — The Humiliator", ur:"ذلت دینے والا"},
  {ar:"السَّمِيعُ", en:"As-Sami' — The All-Hearing", ur:"سب کچھ سننے والا"},
  {ar:"الْبَصِيرُ", en:"Al-Basir — The All-Seeing", ur:"سب کچھ دیکھنے والا"},
  {ar:"الْحَكَمُ", en:"Al-Hakam — The Judge", ur:"فیصلہ کرنے والا"},
  {ar:"الْعَدْلُ", en:"Al-'Adl — The Utterly Just", ur:"عدل کرنے والا"},
  {ar:"اللَّطِيفُ", en:"Al-Latif — The Subtly Kind", ur:"باریک بین"},
  {ar:"الْخَبِيرُ", en:"Al-Khabir — The All-Aware", ur:"خبر رکھنے والا"},
  {ar:"الْحَلِيمُ", en:"Al-Halim — The Forbearing", ur:"بردبار"},
  {ar:"الْعَظِيمُ", en:"Al-'Azim — The Magnificent", ur:"عظمت والا"},
  {ar:"الْغَفُورُ", en:"Al-Ghafoor — The Great Forgiver", ur:"بخشنے والا"},
  {ar:"الشَّكُورُ", en:"Ash-Shakoor — The Grateful", ur:"قدردان"},
  {ar:"الْعَلِيُّ", en:"Al-'Ali — The Highest", ur:"سب سے بلند"},
  {ar:"الْكَبِيرُ", en:"Al-Kabir — The Greatest", ur:"سب سے بڑا"},
  {ar:"الْحَفِيظُ", en:"Al-Hafiz — The Preserver", ur:"حفاظت کرنے والا"},
  {ar:"الْمُقِيتُ", en:"Al-Muqit — The Sustainer", ur:"روزی پہنچانے والا"},
  {ar:"الْحَسِيبُ", en:"Al-Hasib — The Reckoner", ur:"حساب لینے والا"},
  {ar:"الْجَلِيلُ", en:"Al-Jalil — The Majestic", ur:"جلال والا"},
  {ar:"الْكَرِيمُ", en:"Al-Karim — The Generous", ur:"کرم کرنے والا"},
  {ar:"الرَّقِيبُ", en:"Ar-Raqib — The Watchful", ur:"نگرانی کرنے والا"},
  {ar:"الْمُجِيبُ", en:"Al-Mujib — The Responsive", ur:"قبول کرنے والا"},
  {ar:"الْوَاسِعُ", en:"Al-Wasi' — The All-Encompassing", ur:"وسعت والا"},
  {ar:"الْحَكِيمُ", en:"Al-Hakim — The Perfectly Wise", ur:"حکمت والا"},
  {ar:"الْوَدُودُ", en:"Al-Wadud — The Loving One", ur:"محبت کرنے والا"},
  {ar:"الْمَجِيدُ", en:"Al-Majid — The Glorious", ur:"بزرگی والا"},
  {ar:"الْبَاعِثُ", en:"Al-Ba'ith — The Resurrector", ur:"دوبارہ زندہ کرنے والا"},
  {ar:"الشَّهِيدُ", en:"Ash-Shahid — The Witness", ur:"گواہ"},
  {ar:"الْحَقُّ", en:"Al-Haqq — The Absolute Truth", ur:"سچا"},
  {ar:"الْوَكِيلُ", en:"Al-Wakil — The Trustee", ur:"کارساز"},
  {ar:"الْقَوِيُّ", en:"Al-Qawiyy — The Possessor of All Strength", ur:"قوت والا"},
  {ar:"الْمَتِينُ", en:"Al-Matin — The Firm One", ur:"مضبوط"},
  {ar:"الْوَلِيُّ", en:"Al-Waliyy — The Protecting Friend", ur:"دوست"},
  {ar:"الْحَمِيدُ", en:"Al-Hamid — The Praiseworthy", ur:"تعریف کے لائق"},
  {ar:"الْمُحْصِي", en:"Al-Muhsi — The Accounter", ur:"گننے والا"},
  {ar:"الْمُبْدِئُ", en:"Al-Mubdi — The Originator", ur:"پہلی بار پیدا کرنے والا"},
  {ar:"الْمُعِيدُ", en:"Al-Mu'id — The Restorer", ur:"دوبارہ پیدا کرنے والا"},
  {ar:"الْمُحْيِي", en:"Al-Muhyi — The Giver of Life", ur:"زندگی دینے والا"},
  {ar:"الْمُمِيتُ", en:"Al-Mumit — The Bringer of Death", ur:"موت دینے والا"},
  {ar:"الْحَيُّ", en:"Al-Hayy — The Ever-Living", ur:"ہمیشہ زندہ"},
  {ar:"الْقَيُّومُ", en:"Al-Qayyum — The Self-Existing", ur:"ہمیشہ قائم رہنے والا"},
  {ar:"الْوَاجِدُ", en:"Al-Wajid — The Perceiver", ur:"پانے والا"},
  {ar:"الْمَاجِدُ", en:"Al-Majid — The Illustrious", ur:"بزرگی والا"},
  {ar:"الْوَاحِدُ", en:"Al-Wahid — The Only One", ur:"اکیلا"},
  {ar:"الْأَحَدُ", en:"Al-Ahad — The One", ur:"ایک"},
  {ar:"الصَّمَدُ", en:"As-Samad — The Eternal", ur:"بے نیاز"},
  {ar:"الْقَادِرُ", en:"Al-Qadir — The All-Able", ur:"قدرت والا"},
  {ar:"الْمُقْتَدِرُ", en:"Al-Muqtadir — The All-Determiner", ur:"غالب قدرت والا"},
  {ar:"الْمُقَدِّمُ", en:"Al-Muqaddim — The Expediter", ur:"آگے کرنے والا"},
  {ar:"الْمُؤَخِّرُ", en:"Al-Mu'akhkhir — The Delayer", ur:"پیچھے کرنے والا"},
  {ar:"الْأَوَّلُ", en:"Al-Awwal — The First", ur:"سب سے پہلا"},
  {ar:"الْآخِرُ", en:"Al-Akhir — The Last", ur:"سب سے آخر"},
  {ar:"الظَّاهِرُ", en:"Az-Zahir — The Manifest One", ur:"ظاہر"},
  {ar:"الْبَاطِنُ", en:"Al-Batin — The Hidden One", ur:"پوشیدہ"},
  {ar:"الْوَالِي", en:"Al-Waali — The Governor", ur:"حاکم"},
  {ar:"الْمُتَعَالِي", en:"Al-Muta'ali — The Self Exalted", ur:"بلند و برتر"},
  {ar:"الْبَرُّ", en:"Al-Barr — The Doer of Good", ur:"بھلائی کرنے والا"},
  {ar:"التَّوَابُ", en:"At-Tawwab — The Guide to Repentance", ur:"توبہ قبول کرنے والا"},
  {ar:"الْمُنْتَقِمُ", en:"Al-Muntaqim — The Avenger", ur:"انتقام لینے والا"},
  {ar:"الْعَفُوُّ", en:"Al-Afuww — The Forgiver", ur:"معاف کرنے والا"},
  {ar:"الرَّؤُوفُ", en:"Ar-Ra'oof — The Most Kind", ur:"نہایت شفیق"},
  {ar:"مَالِكُ الْمُلْكِ", en:"Malik-ul-Mulk — Owner of All", ur:"بادشاہت کا مالک"},
  {ar:"ذُوالْجَلَالِ وَالْإِكْرَامِ", en:"Dhul-Jalali wal-Ikram — Lord of Majesty and Bounty", ur:"جلال و اکرام والا"},
  {ar:"الْمُقْسِطُ", en:"Al-Muqsit — The Equitable One", ur:"انصاف کرنے والا"},
  {ar:"الْجَامِعُ", en:"Al-Jami' — The Gatherer", ur:"جمع کرنے والا"},
  {ar:"الْغَنِيُّ", en:"Al-Ghani — The Rich One", ur:"بے نیاز"},
  {ar:"الْمُغْنِي", en:"Al-Mughni — The Enricher", ur:"غنی کرنے والا"},
  {ar:"الْمَانِعُ", en:"Al-Mani' — The Preventer of Harm", ur:"روکنے والا"},
  {ar:"الضَّارُّ", en:"Ad-Darr — The Distressor (by His will)", ur:"نقصان پہنچانے والا"},
  {ar:"النَّافِعُ", en:"An-Nafi' — The Benefiter", ur:"نفع دینے والا"},
  {ar:"النُّورُ", en:"An-Nur — The Light", ur:"نور"},
  {ar:"الْهَادِي", en:"Al-Hadi — The Guide", ur:"ہدایت دینے والا"},
  {ar:"الْبَدِيعُ", en:"Al-Badi' — The Originator", ur:"انوکھی چیزیں بنانے والا"},
  {ar:"الْبَاقِي", en:"Al-Baqi — The Everlasting One", ur:"ہمیشہ باقی رہنے والا"},
  {ar:"الْوَارِثُ", en:"Al-Warith — The Inheritor of All", ur:"وارث"},
  {ar:"الرَّشِيدُ", en:"Ar-Rashid — The Righteous Teacher", ur:"راہ دکھانے والا"},
  {ar:"الصَّبُورُ", en:"As-Sabur — The Timeless", ur:"صبر والا"},
];

(function renderAsmaOfDay(){
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - start;
  const dayOfYear = Math.floor(diff / 86400000);
  const idx = dayOfYear % ASMA_UL_HUSNA.length;
  const name = ASMA_UL_HUSNA[idx];
  const short = name.en.split(' — ')[0];
  document.getElementById('asmaCard').innerHTML = `
    <div class="asma-ar">${name.ar}</div>
    <div class="asma-en">${L3(short, name.en, short)}</div>
    <div class="asma-ur">${L3(name.ur, '', ASMA_RO[idx])}</div>
  `;
})();

/* ============================================================
   QURAN: Surah list + detail
   ============================================================ */
const surahGrid = document.getElementById('surahGrid');
const surahListWrap = document.getElementById('surahListWrap');
const surahDetailWrap = document.getElementById('surahDetailWrap');
const surahBanner = document.getElementById('surahBanner');
const ayahsList = document.getElementById('ayahsList');
const backToSurahs = document.getElementById('backToSurahs');
const reciterSelect = document.getElementById('reciterSelect');
const playSurahBtn = document.getElementById('playSurahBtn');

let surahsCache = null;
let currentSurahNumber = null;
let currentAyahAudios = [];
let currentlyPlayingAyahIdx = null;
let fullSurahPlaying = false;
const audioPlayer = new Audio();

function stopAllAudio(){
  audioPlayer.pause();
  audioPlayer.src = '';
  fullSurahPlaying = false;
  currentlyPlayingAyahIdx = null;
  playSurahBtn.classList.remove('playing');
  playSurahBtn.textContent = T({ur:`▶ پوری سورت سنیں`, en:`▶ Play full surah`, roman:`▶ Poori surah sunein`});
  clearAyahHighlight();
}

function clearAyahHighlight(){
  document.querySelectorAll('.ayah.is-playing').forEach(el=> el.classList.remove('is-playing'));
  document.querySelectorAll('.ayah-play-btn.playing').forEach(btn=>{
    btn.classList.remove('playing');
    btn.textContent = '▶';
  });
}

function playAyahAt(idx){
  if(!currentAyahAudios[idx]) return;
  const wasFullSurah = fullSurahPlaying;
  audioPlayer.pause();
  clearAyahHighlight();
  currentlyPlayingAyahIdx = idx;
  fullSurahPlaying = wasFullSurah;

  const ayahEl = document.querySelectorAll('.ayah')[idx];
  const btnEl = document.querySelectorAll('.ayah-play-btn')[idx];
  if(ayahEl){
    ayahEl.classList.add('is-playing');
    ayahEl.scrollIntoView({behavior:'smooth', block:'center'});
  }
  if(btnEl){ btnEl.classList.add('playing'); btnEl.textContent = '❚❚'; }
  audioPlayer.src = currentAyahAudios[idx];
  audioPlayer.play();
}

audioPlayer.addEventListener('ended', ()=>{
  if(currentlyPlayingAyahIdx !== null){
    const nextIdx = currentlyPlayingAyahIdx + 1;
    if(currentAyahAudios[nextIdx]){
      playAyahAt(nextIdx);
    } else {
      stopAllAudio();
    }
  }
});

playSurahBtn.addEventListener('click', ()=>{
  if(fullSurahPlaying){
    stopAllAudio();
    return;
  }
  if(!currentSurahNumber || !currentAyahAudios.length) return;
  stopAllAudio();
  fullSurahPlaying = true;
  playSurahBtn.classList.add('playing');
  playSurahBtn.textContent = T({ur:`❚❚ روکیں`, en:`❚❚ Stop`, roman:`❚❚ Rokein`});
  playAyahAt(0);
});

reciterSelect.addEventListener('change', ()=>{
  stopAllAudio();
  if(currentSurahNumber) openSurah(currentSurahNumber);
});

async function loadSurahList(){
  try{
    const res = await fetch('https://api.alquran.cloud/v1/surah');
    const data = await res.json();
    surahsCache = data.data;
    renderSurahGrid(surahsCache);
  }catch(err){
  surahGrid.innerHTML = `<div class="error-box">${L3(`سورتوں کی فہرست لوڈ نہیں ہو سکی۔ انٹرنیٹ کنکشن چیک کریں اور دوبارہ کوشش کریں۔`,`Could not load the surah list — please check your internet connection and try again.`,`Surah list load nahi ho saki. Internet connection check karein aur dobara koshish karein.`)}</div>`;
  }
}

function renderSurahGrid(list){
  surahGrid.className = 'surah-grid';
  surahGrid.innerHTML = list.map(s => `
    <div class="surah-card" data-num="${s.number}">
      <div class="surah-num">${s.number}</div>
      <div class="surah-meta">
        <div class="surah-en">${s.englishName}</div>
        <div class="surah-sub">${s.englishNameTranslation} · ${s.numberOfAyahs} ayahs</div>
      </div>
      <div class="surah-ar">${s.name}</div>
    </div>
  `).join('');
  surahGrid.querySelectorAll('.surah-card').forEach(card=>{
    card.addEventListener('click', ()=> openSurah(parseInt(card.dataset.num)));
  });
}

let currentUthmaniAyahs = null;
let currentIndopakAyahs = null;
let currentUrduAyahs = null;
let currentEnglishAyahs = null;

async function openSurah(number){
  surahListWrap.style.display = 'none';
  surahDetailWrap.style.display = 'block';
  ayahsList.className = 'loading';
  ayahsList.innerHTML = `${L3(`لوڈ ہو رہا ہے...`,`Loading ayahs…`,`Ayat load ho rahi hain...`)}`;
  surahBanner.innerHTML = '';
  stopAllAudio();
  currentSurahNumber = number;

  try{
    const reciter = reciterSelect.value;

    // Main data (Arabic Uthmani + Urdu + English + audio) — required
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}/editions/quran-uthmani,ur.jalandhry,en.sahih,${reciter}`);
    const data = await res.json();
    const [arabicEd, urduEd, englishEd, audioEd] = data.data;
    currentAyahAudios = audioEd.ayahs.map(a => a.audio);
    currentUthmaniAyahs = arabicEd.ayahs;
    currentUrduAyahs = urduEd.ayahs;
    currentEnglishAyahs = englishEd.ayahs;

    // IndoPak script — optional enhancement, falls back to Uthmani if it fails
    // (slow/blocked connections shouldn't break the whole surah)
    currentIndopakAyahs = null;
    try{
      const controller = new AbortController();
      const timeoutId = setTimeout(()=> controller.abort(), 8000);
      const indopakRes = await fetch(
        `https://raw.githubusercontent.com/fawazahmed0/quran-api/1/editions/ara-quranindopak/${number}.json`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      const indopakData = await indopakRes.json();
      currentIndopakAyahs = indopakData.chapter;
    }catch(indopakErr){
      currentIndopakAyahs = null; // silently fall back to Uthmani script below
    }

    surahBanner.innerHTML = `
      <div class="surah-banner">
        <div class="ar">${arabicEd.name}</div>
        <div class="en">${arabicEd.englishName} — ${arabicEd.englishNameTranslation}</div>
        <div class="info">${arabicEd.revelationType} &middot; ${arabicEd.numberOfAyahs} Ayahs</div>
      </div>
    `;

    renderAyahsList();
  }catch(err){
    ayahsList.className = '';
    ayahsList.innerHTML = `<div class="error-box">${L3(`یہ سورت لوڈ نہیں ہو سکی۔ دوبارہ کوشش کریں۔`,`Could not load this surah — please try again.`,`Yeh surah load nahi ho saki. Dobara koshish karein.`)}</div>`;
  }
}

function renderAyahsList(){
  if(!currentUthmaniAyahs) return;
  const useIndopak = scriptSelect.value === 'indopak' && currentIndopakAyahs;
  const fontClass = (scriptSelect.value === 'indopak') ? 'indopak-mode' : '';

  const ayahsHtml = currentUthmaniAyahs.map((ayah, i) => `
    <div class="ayah">
      <span class="ayah-num">${ayah.numberInSurah}</span>
      <button class="ayah-play-btn" data-idx="${i}" title="Listen">▶</button>
      <div class="ayah-ar ${fontClass}">${useIndopak ? currentIndopakAyahs[i].text : ayah.text}</div>
      <div class="ayah-ur">${currentUrduAyahs[i].text}</div>
      <div class="ayah-en">${currentEnglishAyahs[i].text}</div>
    </div>
  `).join('');
  ayahsList.className = '';
  ayahsList.innerHTML = ayahsHtml;

  ayahsList.querySelectorAll('.ayah-play-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = parseInt(btn.dataset.idx);
      if(currentlyPlayingAyahIdx === idx && !audioPlayer.paused){
        stopAllAudio();
      } else {
        playAyahAt(idx);
      }
    });
  });
}

const scriptSelect = document.getElementById('scriptSelect');
scriptSelect.addEventListener('change', renderAyahsList);

backToSurahs.addEventListener('click', ()=>{
  stopAllAudio();
  surahDetailWrap.style.display = 'none';
  surahListWrap.style.display = 'block';
});

loadSurahList();

/* ============================================================
   NAMAZ: Prayer times (Al-Adhan API) — works for any country/city
   ============================================================ */
const COUNTRIES = ["Pakistan","Saudi Arabia","United Arab Emirates","India","Bangladesh","United Kingdom",
"United States","Canada","Turkey","Egypt","Indonesia","Malaysia","Afghanistan","Iran","Iraq","Jordan",
"Kuwait","Qatar","Bahrain","Oman","Yemen","Morocco","Algeria","Tunisia","Libya","Sudan","Nigeria","Kenya",
"South Africa","Germany","France","Netherlands","Australia","China","Sri Lanka","Nepal","Somalia",
"Azerbaijan","Uzbekistan","Kazakhstan","Tajikistan","Kyrgyzstan","Albania","Bosnia and Herzegovina",
"Singapore","Brunei","Maldives","Palestine","Lebanon","Syria"];

const countrySelect = document.getElementById('countrySelect');
COUNTRIES.forEach(c=>{
  const opt = document.createElement('option');
  opt.value = c; opt.textContent = c;
  countrySelect.appendChild(opt);
});
countrySelect.addEventListener('change', ()=>{
  if(countrySelect.value) document.getElementById('countryInputManual').value = '';
});

const PRAYER_LABELS = [
  {key:'Fajr', en:'Fajr', ur:'فجر'},
  {key:'Dhuhr', en:'Dhuhr', ur:'ظہر'},
  {key:'Asr', en:'Asr', ur:'عصر'},
  {key:'Maghrib', en:'Maghrib', ur:'مغرب'},
  {key:'Isha', en:'Isha', ur:'عشاء'},
];

const timingsResult = document.getElementById('timingsResult');

async function fetchTimingsByCity(city, country){
  timingsResult.innerHTML = `<div class="loading">${L3(`اوقات معلوم کیے جا رہے ہیں...`,`Fetching prayer times…`,`Auqat maloom kiye ja rahe hain...`)}</div>`;
  try{
    const school = localStorage.getItem('deenaasan_fiqh') || '0';
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2&school=${school}`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.code !== 200) throw new Error('bad response');
    renderTimings(data.data, `${city}, ${country}`);
  }catch(err){
    timingsResult.innerHTML = `<div class="error-box">${L3(`شہر یا ملک کا نام درست لکھیں اور دوبارہ کوشش کریں۔`,`Could not find prayer times for that location — please check the spelling and try again.`,`Shehar ya mulk ka naam sahi likhein aur dobara koshish karein.`)}</div>`;
  }
}

async function fetchTimingsByCoords(lat, lon){
  timingsResult.innerHTML = `<div class="loading">${L3(`اوقات معلوم کیے جا رہے ہیں...`,`Fetching prayer times…`,`Auqat maloom kiye ja rahe hain...`)}</div>`;
  try{
    const school = localStorage.getItem('deenaasan_fiqh') || '0';
    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2&school=${school}`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.code !== 200) throw new Error('bad response');
    renderTimings(data.data, `${lat.toFixed(2)}, ${lon.toFixed(2)}`);
  }catch(err){
    timingsResult.innerHTML = `<div class="error-box">${L3(`آپ کی لوکیشن سے وقت معلوم نہیں ہو سکا۔ دوبارہ کوشش کریں۔`,`Could not fetch prayer times for your location — please try again.`,`Location se waqt maloom nahi ho saka. Dobara koshish karein.`)}</div>`;
  }
}

function renderTimings(data, locationLabel){
  const t = data.timings;
  const date = data.date.readable;
  const hijri = data.date.hijri ? `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year} AH` : '';

  timingsResult.innerHTML = `
    <div class="timings-card">
      <div class="timings-loc">📍 ${locationLabel}</div>
      <div class="timings-date">${date}${hijri ? ' &middot; ' + hijri : ''}</div>
      <div class="timings-grid">
        ${PRAYER_LABELS.map(p => `
          <div class="timing-item">
            <div class="p-ur">${L3(p.ur,'','')}</div>
            <div class="p-en">${p.en}</div>
            <div class="p-time">${t[p.key]}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  updateHomeNextPrayer(t, locationLabel);
  window.lastFetchedTimings = t;
  if(localStorage.getItem('deenaasan_notif_enabled') === '1' && typeof scheduleNotificationsForToday === 'function'){
    scheduleNotificationsForToday(t);
  }
}

function updateHomeNextPrayer(t, locationLabel){
  const now = new Date();
  const order = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
  const toMinutes = (str)=>{
    const [h,m] = str.split(':').map(Number);
    return h*60+m;
  };
  const nowMin = now.getHours()*60 + now.getMinutes();
  let next = order.find(k => toMinutes(t[k]) > nowMin);
  if(!next) next = order[0];
  const label = PRAYER_LABELS.find(p=>p.key===next);
  document.getElementById('homeNextPrayerCard').innerHTML = `
    <div class="hnp-label">📍 ${locationLabel}</div>
    <div class="hnp-name">${L3(`اگلی نماز`,`Next prayer`,`Agli namaz`)}</div>
    <div class="hnp-time">${label.ur} ${t[next]}</div>
  `;
}

document.getElementById('getTimingsBtn').addEventListener('click', ()=>{
  const city = document.getElementById('cityInput').value.trim();
  const country = (document.getElementById('countryInputManual').value.trim()) || countrySelect.value;
  if(!city || !country){
    timingsResult.innerHTML = `<div class="error-box">${L3(`براہِ کرم شہر اور ملک دونوں لکھیں۔`,`Please enter both a city and a country.`,`Meherbani karke shehar aur mulk dono likhein.`)}</div>`;
    return;
  }
  fetchTimingsByCity(city, country);
});

document.getElementById('useLocationBtn').addEventListener('click', ()=>{
  if(!navigator.geolocation){
    timingsResult.innerHTML = `<div class="error-box">${L3(`یہ براؤزر لوکیشن کو سپورٹ نہیں کرتا۔ شہر/ملک خود لکھیں۔`,`Geolocation is not supported here — please enter the city and country manually.`,`Yeh browser location support nahi karta. Shehar/mulk manually likhein.`)}</div>`;
    return;
  }
  timingsResult.innerHTML = `<div class="loading">${L3(`لوکیشن معلوم کی جا رہی ہے...`,`Getting your location…`,`Location maloom ki ja rahi hai...`)}</div>`;
  navigator.geolocation.getCurrentPosition(
    (pos)=> fetchTimingsByCoords(pos.coords.latitude, pos.coords.longitude),
    (err)=> {
      timingsResult.innerHTML = `<div class="error-box">${L3(`لوکیشن کی اجازت نہیں ملی۔ شہر اور ملک خود لکھ کر «اوقات معلوم کریں» دبائیں۔`,`Location permission was denied — please enter the city and country and tap “Get timings”.`,`Location ki ijazat nahi mili. Shehar aur mulk khud likh kar Get timings dabayein.`)}</div>`;
    }
  );
});

/* ============================================================
   DUAS: static curated list (Arabic + transliteration + Urdu + English)
   ============================================================ */
const DUAS = [
  {
    en:"Morning Dua", ur:"صبح کی دعا",
    ar:"اَللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    translit:"Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykal-masir",
    ur_tr:"اے اللہ! تیری ہی قدرت سے ہم صبح کے وقت میں داخل ہوئے اور تیری ہی قدرت سے ہم شام کے وقت میں داخل ہوئے، اور تیری ہی قدرت سے ہم جیتے اور مرتے ہیں، اور تیری ہی طرف جانا ہے۔",
    en_tr:"O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is our return.",
    ref:"ترمذی: ۳۳۹۱"
  },
  {
    en:"When the Sun Rises", ur:"سورج نکلنے کے وقت کی دعا",
    ar:"الْحَمْدُ لِلَّهِ الَّذِي أَقَالَنَا يَوْمَنَا هَذَا وَلَمْ يُهْلِكْنَا بِذُنُوبِنَا",
    translit:"Alhamdu lillahil-lazi aqalana yawmana haza wa lam yuhlikna bidhunubina",
    ur_tr:"سب تعریفیں اللہ ہی کے لیے ہیں جس نے آج ہمیں معاف رکھا اور گناہوں کے سبب ہمیں ہلاک نہ فرمایا۔",
    en_tr:"All praise is for Allah who spared us this day and did not destroy us for our sins.",
    ref:"مسلم: ۱۹۱۱"
  },
  {
    en:"Evening Dua", ur:"شام کی دعا",
    ar:"اَللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    translit:"Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykan-nushoor",
    ur_tr:"اے اللہ! ہم تیری ہی قدرت سے شام کے وقت میں داخل ہوئے اور تیری ہی قدرت سے صبح کے وقت میں داخل ہوئے، اور تیری ہی قدرت سے جیتے اور مرتے ہیں، اور مرنے کے بعد اٹھ کر تیری ہی طرف جانا ہے۔",
    en_tr:"O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is our resurrection.",
    ref:"ترمذی: ۳۳۹۱"
  },
  {
    en:"Special Morning & Evening Dua", ur:"صبح و شام کی ایک خاص دعا",
    ar:"بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    translit:"Bismillahil-lazi la yadurru ma'a ismihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Aleem",
    ur_tr:"اللہ کے نام سے، جس کے نام کے ساتھ نہ زمین میں کوئی چیز نقصان دے سکتی ہے نہ آسمان میں، اور وہ سننے والا اور جاننے والا ہے۔ (حضرت عثمانؓ فرماتے ہیں کہ رسول اللہ ﷺ نے فرمایا: جو بندہ ہر صبح و شام یہ کلمات تین مرتبہ پڑھ لیا کرے تو اسے کوئی چیز ضرر نہیں پہنچائے گی۔)",
    en_tr:"In the name of Allah, with whose name nothing can harm on earth or in the heavens, and He is the All-Hearing, the All-Knowing. (Whoever recites this three times morning and evening, nothing will suddenly harm him.)",
    ref:"ترمذی: ۳۳۸۸"
  },
  {
    en:"Before Sleeping", ur:"سونے سے پہلے کی دعا",
    ar:"بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    translit:"Bismika Allahumma amootu wa ahya",
    ur_tr:"اے اللہ! میں تیرا ہی نام لے کر مرتا اور جیتا ہوں۔ (سوتے وقت یہ بھی پڑھیں: سُبْحَانَ اللّٰہِ ۳۳ بار، اَلْحَمْدُ لِلّٰہِ ۳۳ بار، اَللّٰہُ اَکْبَرُ ۳۴ بار۔)",
    en_tr:"In Your name, O Allah, I die and I live. (Also recite before sleeping: SubhanAllah 33 times, Alhamdulillah 33 times, Allahu Akbar 34 times.)",
    ref:"بخاری: ۶۳۱۲، ۶۳۱۸"
  },
  {
    en:"Protection Before Sleep", ur:"سوتے وقت حفاظت کی دعا",
    ar:"اَللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَجْمَعُ عِبَادَكَ",
    translit:"Allahumma qini 'adhabaka yawma tajma'u 'ibadak",
    ur_tr:"اے اللہ! مجھے اپنے عذاب سے بچائیو جس روز تو اپنے بندوں کو جمع فرمائے گا۔",
    en_tr:"O Allah, protect me from Your punishment on the Day You gather Your servants.",
    ref:"ابوداود: ۵۰۵۳"
  },
  {
    en:"Waking Up", ur:"سو کر جاگنے کی دعا",
    ar:"الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    translit:"Alhamdu lillahil-lazi ahyana ba'da ma amatana wa ilayhin-nushoor",
    ur_tr:"سب تعریفیں اللہ ہی کے لیے ہیں جس نے ہمیں موت دے کر زندگی بخشی، اور اسی کی طرف اٹھ کر جانا ہے۔",
    en_tr:"All praise is for Allah who gave us life after having taken it from us, and unto Him is the return.",
    ref:"بخاری: ۶۳۱۲"
  },
  {
    en:"Entering the Toilet", ur:"بیت الخلاء میں داخل ہونے کی دعا",
    ar:"اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ",
    translit:"Allahumma inni a'udhu bika minal-khubthi wal-khaba'ith",
    ur_tr:"اے اللہ! میں تیری پناہ چاہتا ہوں خبیث جنوں سے، مرد ہوں یا عورت۔ (پہلے بسم اللہ کہیں۔)",
    en_tr:"O Allah, I seek refuge in You from male and female devils. (Say 'Bismillah' before entering.)",
    ref:"بخاری: ۶۳۲۲"
  },
  {
    en:"Leaving the Toilet", ur:"بیت الخلاء سے نکلنے کی دعا",
    ar:"الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَى وَعَافَانِي",
    translit:"Alhamdu lillahil-lazi adhhaba 'annil-adha wa 'afani",
    ur_tr:"سب تعریفیں اللہ ہی کے لیے ہیں جس نے تکلیف دینے والی چیز مجھ سے دور کی اور مجھے سکون دیا۔",
    en_tr:"All praise is for Allah who relieved me of discomfort and gave me relief.",
    ref:"ابن ماجہ: ۳۰۱"
  },
  {
    en:"Starting Wudu", ur:"وضو شروع کرنے کی دعا",
    ar:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translit:"Bismillahir-Rahmanir-Raheem",
    ur_tr:"شروع کرتا ہوں اللہ کے نام سے جو بڑا مہربان، نہایت رحم والا ہے۔",
    en_tr:"I begin in the name of Allah, the Most Compassionate, the Most Merciful.",
    ref:"ابوداود: ۱۰۱"
  },
  {
    en:"After Completing Wudu", ur:"وضو مکمل ہونے کے بعد کی دعا",
    ar:"أَشْهَدُ أَنْ لَّا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ اَللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
    translit:"Ash-hadu al-la ilaha illallahu wahdahu la sharika lah, wa ash-hadu anna Muhammadan 'abduhu wa rasooluh. Allahummaj-'alni minat-tawwabina waj-'alni minal-mutatahhireen",
    ur_tr:"میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اور میں گواہی دیتا ہوں کہ محمد ﷺ اللہ کے بندے اور اس کے رسول ہیں۔ اے اللہ! مجھے توبہ کرنے والوں میں اور پاک رہنے والوں میں شامل فرما۔",
    en_tr:"I bear witness that there is no deity but Allah alone, with no partner, and that Muhammad is His servant and Messenger. O Allah, make me among those who repent and among those who purify themselves.",
    ref:"ترمذی: ۵۵"
  },
  {
    en:"Entering the Masjid", ur:"مسجد میں داخل ہونے کی دعا",
    ar:"اَللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    translit:"Allahummaf-tah li abwaba rahmatik",
    ur_tr:"اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔",
    en_tr:"O Allah, open the gates of Your mercy for me.",
    ref:"مسلم: ۱۷۵۲"
  },
  {
    en:"Sitting in the Masjid", ur:"مسجد میں بیٹھے بیٹھے پڑھنے کی دعا",
    ar:"سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
    translit:"Subhanallahi wal-hamdu lillahi wa la ilaha illallahu wallahu akbar",
    ur_tr:"اللہ پاک ہے، اور سب تعریفیں اللہ ہی کے لیے ہیں، اور اللہ کے سوا کوئی معبود نہیں، اور اللہ سب سے بڑا ہے۔",
    en_tr:"Glory be to Allah, all praise is for Allah, there is no deity but Allah, and Allah is the Greatest.",
    ref:"الاذکار للنووی: ص۷۷"
  },
  {
    en:"Leaving the Masjid", ur:"مسجد سے نکلنے کی دعا",
    ar:"اَللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    translit:"Allahumma inni as'aluka min fadlik",
    ur_tr:"اے اللہ! میں تجھ سے تیرے فضل کا سوال کرتا ہوں۔",
    en_tr:"O Allah, I ask You from Your bounty.",
    ref:"مسلم: ۱۷۵۲"
  },
  {
    en:"Hearing the Adhan", ur:"اذان سننے کے وقت کا عمل",
    ar:"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    translit:"La hawla wa la quwwata illa billah",
    ur_tr:"جو موذن کہے وہی الفاظ دہرائیں، سوائے «حَیَّ عَلَی الصَّلٰوۃ» اور «حَیَّ عَلَی الْفَلَاح» کے — ان کے جواب میں یہ کہیں: لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّہِ (اللہ کی مدد کے بغیر نہ کوئی طاقت ہے نہ قوت)۔",
    en_tr:"Repeat whatever the mu'adhin says, except at 'Hayya 'alas-salah' and 'Hayya 'alal-falah', where you respond: 'La hawla wa la quwwata illa billah' (There is no might nor power except with Allah).",
    ref:"بخاری: ۶۱۱، ۶۱۳"
  },
  {
    en:"After the Adhan", ur:"اذان ختم ہونے کے بعد کی دعا",
    ar:"اَللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَّحْمُودًا الَّذِي وَعَدْتَهُ",
    translit:"Allahumma Rabba hazihid-da'watit-tammati was-salatil-qa'imati, aati Muhammadanil-wasilata wal-fadeelata wab-'athhu maqaman mahmoodanil-lazi wa'adtah",
    ur_tr:"(درود شریف کے بعد یہ دعا پڑھیں) اے اللہ! اس پوری پکار کے رب اور قائم ہونے والی نماز کے رب! محمد ﷺ کو وسیلہ اور فضیلت عطا فرما، اور ان کو اس مقامِ محمود پر پہنچا جس کا تو نے ان سے وعدہ فرمایا ہے۔",
    en_tr:"(Recite after sending blessings on the Prophet ﷺ) O Allah, Lord of this perfect call and of the establishing of prayer, grant Muhammad the intercession and favor, and raise him to the honored station You have promised him.",
    ref:"بخاری: ۶۱۴"
  },
  {
    en:"After the Fard Prayer", ur:"فرض نماز کے سلام کے بعد کی دعا",
    ar:"بِسْمِ اللَّهِ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الرَّحْمَٰنُ الرَّحِيمُ اَللَّهُمَّ أَذْهِبْ عَنِّي الْهَمَّ وَالْحُزْنَ",
    translit:"Bismillahil-lazi la ilaha illa Huwar-Rahmanur-Raheem, Allahumma adh-hib 'annil-hamma wal-huzn",
    ur_tr:"(سلام کے بعد سر پر داہنا ہاتھ رکھ کر پڑھیں) میں نے اللہ کے نام کے ساتھ (نماز ختم کی) جس کے سوا کوئی معبود نہیں، جو رحمٰن و رحیم ہے۔ اے اللہ! تو مجھ سے فکر اور غم دور کردے۔",
    en_tr:"(After the salam, place your right hand on your head and recite) In the name of Allah, besides whom there is no deity, the Most Compassionate, the Most Merciful. O Allah, remove worry and grief from me.",
    ref:"مجمع الزوائد: ۱/۲۶۹"
  },
  {
    en:"Seeking Peace After Prayer", ur:"استغفار کے بعد کی دعا",
    ar:"اَللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    translit:"Allahumma anta-s-Salamu wa minka-s-salamu tabarakta ya Zal-Jalali wal-Ikram",
    ur_tr:"(تین بار «اَسْتَغْفِرُ اللّٰہَ» کہنے کے بعد یہ پڑھیں) اے اللہ! تو سلامتی والا ہے اور تجھ ہی سے سلامتی ملتی ہے، تو بابرکت ہے، اے عظمت اور بزرگی والے!",
    en_tr:"(After saying 'Astaghfirullah' three times, recite) O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honor.",
    ref:"نسائی: ۱۳۵۳"
  },
  {
    en:"After Witr Prayer", ur:"نماز وتر کے بعد کی دعا",
    ar:"سُبْحَانَ الْمَلِكِ الْقُدُّوسِ",
    translit:"Subhanal-Malikil-Quddoos",
    ur_tr:"میں پاکی بیان کرتا ہوں بادشاہ یعنی اللہ کی، جو نہایت پاک ہے۔ (تین مرتبہ پڑھیں، تیسری بار آواز بلند کریں۔)",
    en_tr:"Glory be to the King, the Most Holy. (Recite three times, raising the voice on the third.)",
    ref:"ابوداود: ۱۴۳۰"
  },
  {
    en:"After Fajr & Maghrib", ur:"نمازِ فجر اور مغرب کے بعد کی دعا",
    ar:"اَللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
    translit:"Allahumma ajirni minan-nar",
    ur_tr:"اے اللہ! مجھے دوزخ سے محفوظ فرما۔ (نبی ﷺ نے فرمایا: جو فجر اور مغرب کے بعد کسی سے بات کرنے سے پہلے سات بار یہ پڑھ لے، اس دن یا رات میں مر جائے تو دوزخ سے ضرور نجات ملے گی۔)",
    en_tr:"O Allah, save me from the Fire. (The Prophet ﷺ said: whoever says this seven times after Fajr and after Maghrib before speaking to anyone, and dies that day or night, will be saved from the Fire.)",
    ref:"ابوداود: ۵۰۷۹"
  },
  {
    en:"Leaving the Home", ur:"گھر سے نکلنے کی دعا",
    ar:"بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    translit:"Bismillahi tawakkaltu 'alallah, la hawla wa la quwwata illa billah",
    ur_tr:"میں اللہ کا نام لے کر نکلا، میں نے اللہ ہی پر بھروسہ کیا، گناہوں سے بچنے اور عبادت کرنے کی طاقت صرف اللہ ہی کی طرف سے ہے۔",
    en_tr:"In the name of Allah, I place my trust in Allah; there is no power and no strength except with Allah.",
    ref:"ترمذی: ۳۴۲۶"
  },
  {
    en:"Entering the Home", ur:"گھر میں داخل ہونے کی دعا",
    ar:"اَللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    translit:"Allahumma inni as'aluka khayral-mawlaji wa khayral-makhraji, bismillahi walajna wa bismillahi kharajna wa 'alallahi Rabbina tawakkalna",
    ur_tr:"اے اللہ! میں تجھ سے اچھا داخل ہونا اور اچھا نکلنا مانگتا ہوں، اللہ کا نام لے کر ہم داخل ہوئے اور اللہ کا نام لے کر ہم نکلے، اور اللہ ہی پر جو ہمارا رب ہے بھروسہ کیا۔ (اس کے بعد گھر والوں کو سلام کریں۔)",
    en_tr:"O Allah, I ask You for the best entrance and the best exit. In the name of Allah we enter, and in the name of Allah we leave, and upon Allah, our Lord, we place our trust. (Then greet your household with salam.)",
    ref:"ابوداود: ۵۰۹۶"
  },
  {
    en:"Entering the Market", ur:"بازار میں جانے کی دعا",
    ar:"بِسْمِ اللَّهِ اَللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ السُّوقِ وَخَيْرَ مَا فِيهَا وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا",
    translit:"Bismillah, Allahumma inni as'aluka khayra hazihis-suqi wa khayra ma feeha, wa a'udhu bika min sharriha wa sharri ma feeha",
    ur_tr:"اللہ کے نام سے، اے اللہ! میں اس بازار کی اور اس میں جو کچھ ہے اس کی بھلائی مانگتا ہوں، اور تیری پناہ چاہتا ہوں اس کے شر سے اور اس میں جو کچھ ہے اس کے شر سے۔",
    en_tr:"In the name of Allah. O Allah, I ask You for the good of this market and what is in it, and I seek refuge in You from its evil and the evil of what is in it.",
    ref:"مستدرک حاکم: ۱۹۶۴"
  },
  {
    en:"Before Eating", ur:"کھانا شروع کرنے کی دعا",
    ar:"بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    translit:"Bismillahi wa 'ala barakatillah",
    ur_tr:"میں اللہ کے نام سے اور اللہ کی برکت سے کھانا شروع کرتا ہوں۔",
    en_tr:"In the name of Allah and with the blessing of Allah.",
    ref:"مستدرک حاکم: ۷۰۸۳"
  },
  {
    en:"If You Forgot Bismillah", ur:"شروع میں بسم اللہ کہنا بھول جائے تو",
    ar:"بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
    translit:"Bismillahi awwalahu wa akhirah",
    ur_tr:"میں نے اس کے شروع اور آخر میں اللہ کا نام لیا۔ (یاد آنے پر یہ کہیں۔ حدیث میں ہے: جس کھانے میں بسم اللہ نہ پڑھی جائے، شیطان کو اس میں سے کھانے کا موقع مل جاتا ہے۔)",
    en_tr:"In the name of Allah at its beginning and its end. (Say this when you remember partway through. It is reported that if Bismillah is not said, Satan shares in that food.)",
    ref:"مستدرک حاکم: ۷۰۸۹، مسلم: ۵۳۵۹"
  },
  {
    en:"After Eating", ur:"کھانے کے بعد کی دعا",
    ar:"الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ",
    translit:"Alhamdu lillahil-lazi at'amana wa saqana wa ja'alana minal-Muslimeen",
    ur_tr:"سب تعریفیں اللہ ہی کے لیے ہیں جس نے ہمیں کھلایا اور پلایا اور ہمیں مسلمان بنایا۔",
    en_tr:"All praise is for Allah who fed us, gave us drink, and made us Muslims.",
    ref:"ترمذی: ۳۳۵۶"
  },
  {
    en:"After Drinking Milk", ur:"دودھ پی کر پڑھنے کی دعا",
    ar:"اَللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ",
    translit:"Allahumma barik lana feehi wa zidna minh",
    ur_tr:"اے اللہ! اس میں ہمارے لیے برکت دے اور یہ ہمیں زیادہ نصیب فرما۔",
    en_tr:"O Allah, bless it for us and give us more of it.",
    ref:"ترمذی: ۳۴۵۵"
  },
  {
    en:"Eating at Someone's Invitation", ur:"دعوت میں کھانا کھانے کی دعا",
    ar:"اَللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي وَاسْقِ مَنْ سَقَانِي",
    translit:"Allahumma at'im man at'amani was-qi man saqani",
    ur_tr:"اے اللہ! جس نے مجھے کھلایا تو اسے کھلا، اور جس نے مجھے پلایا تو اسے پلا۔",
    en_tr:"O Allah, feed the one who fed me, and give drink to the one who gave me drink.",
    ref:"مسلم: ۵۳۶۲"
  },
  {
    en:"Leaving the Host's Home", ur:"میزبان کے گھر سے رخصت ہوتے وقت کی دعا",
    ar:"اَللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ",
    translit:"Allahumma barik lahum fima razaqtahum waghfir lahum warhamhum",
    ur_tr:"اے اللہ! ان کے رزق میں برکت دے، ان کو بخش دے اور ان پر رحم فرما۔",
    en_tr:"O Allah, bless them in what You have provided them, forgive them, and have mercy on them.",
    ref:"ابوداود: ۳۸۲۹"
  },
  {
    en:"Breaking the Fast", ur:"روزہ افطار کرنے کی دعا",
    ar:"اَللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    translit:"Allahumma laka sumtu wa 'ala rizqika aftartu",
    ur_tr:"اے اللہ! میں نے تیرے ہی لیے روزہ رکھا اور تیرے ہی دیے ہوئے رزق سے روزہ کھولا۔",
    en_tr:"O Allah, I fasted for You and I break my fast with Your provision.",
    ref:"ابوداود: ۲۳۵۸"
  },
  {
    en:"After Breaking the Fast", ur:"افطار کے بعد کی دعا",
    ar:"ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    translit:"Zahabaz-zama'u wabtallatil-'urooqu wa thabatal-ajru inshaa'Allah",
    ur_tr:"پیاس چلی گئی اور رگیں تر ہو گئیں، اور اللہ کے چاہنے سے ثواب ثابت ہو چکا۔",
    en_tr:"The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
    ref:"ابوداود: ۲۳۵۴"
  },
  {
    en:"Breaking Fast at Someone's Home", ur:"کسی کے یہاں افطار کرنے کی دعا",
    ar:"أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ وَصَلَّتْ عَلَيْكُمُ الْمَلَائِكَةُ",
    translit:"Aftara 'indakumus-sa'imoona wa akala ta'amakumul-abraru wa sallat 'alaykumul-mala'ikah",
    ur_tr:"تمہارے پاس روزہ داروں نے افطار کیا اور نیک بندوں نے تمہارا کھانا کھایا، اور تم پر فرشتے رحمت بھیجیں۔",
    en_tr:"May those who fast break their fast at your home, may the righteous eat your food, and may the angels send blessings upon you.",
    ref:"ابوداود: ۳۸۵۳"
  },
  {
    en:"Wearing New Clothes", ur:"کپڑا پہننے کی دعا",
    ar:"الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِّنِّي وَلَا قُوَّةٍ",
    translit:"Alhamdu lillahil-lazi kasani haza wa razaqanihi min ghayri hawlim-minni wa la quwwah",
    ur_tr:"سب تعریفیں اللہ ہی کے لیے ہیں جس نے مجھے یہ کپڑا پہنایا اور بغیر میری کوشش اور طاقت کے مجھے یہ نصیب کیا۔",
    en_tr:"All praise is for Allah who clothed me with this and provided it for me without any power or might of my own.",
    ref:"ابوداود: ۴۰۲۳"
  },
  {
    en:"When Wearing New Clothes", ur:"نیا کپڑا پہنتے وقت کی دعا",
    ar:"اَللَّهُمَّ لَكَ الْحَمْدُ كَسَوْتَنِيهِ أَسْأَلُكَ خَيْرَهُ وَخَيْرَ مَا صُنِعَ لَهُ وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
    translit:"Allahumma lakal-hamdu, kasawtaneehi, as'aluka khayrahu wa khayra ma suni'a lah, wa a'udhu bika min sharrihi wa sharri ma suni'a lah",
    ur_tr:"اے اللہ! تیرے لیے سب تعریف ہے، تو نے ہی مجھے یہ پہنایا ہے، میں اس کی بھلائی اور جس کام کے لیے یہ بنایا گیا اس کی بھلائی تجھ سے مانگتا ہوں، اور اس کے شر اور جس کام کے لیے یہ بنایا گیا اس کے شر سے تیری پناہ چاہتا ہوں۔",
    en_tr:"O Allah, all praise is for You. You have clothed me with this; I ask You for its good and the good of what it was made for, and I seek refuge in You from its evil and the evil of what it was made for.",
    ref:"ابوداود: ۴۰۲۰"
  },
  {
    en:"Seeking Refuge (General)", ur:"عمومی پناہ کی دعا",
    ar:"أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جُعِلَتْ لَهُ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جُعِلَتْ لَهُ",
    translit:"As'aluka khayraha wa khayra ma ju'ilat lah, wa a'udhu bika min sharriha wa sharri ma ju'ilat lah",
    ur_tr:"میں تجھ سے اس چیز کی بھلائی اور جس کام کے لیے یہ بنائی گئی اس کی بھلائی کا سوال کرتا ہوں، اور اس کے شر اور جس کام کے لیے یہ بنائی گئی اس کے شر سے تیری پناہ چاہتا ہوں۔",
    en_tr:"I ask You for its good and the good of what it was made for, and I seek refuge in You from its evil and the evil of what it was made for.",
    ref:"ترمذی: ۱۷۶۷"
  },
  {
    en:"Looking in the Mirror", ur:"آئینے میں چہرہ دیکھنے کی دعا",
    ar:"اَللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
    translit:"Allahumma anta hassanta khalqi fahassin khuluqi",
    ur_tr:"سب تعریفیں اللہ ہی کے لیے ہیں۔ اے اللہ! جیسے تو نے میری صورت اچھی بنائی ہے، میرے اخلاق بھی اچھے کردے۔",
    en_tr:"O Allah, just as You have made my outward form good, make my character good as well.",
    ref:"عمل الیوم واللیلۃ لابن السنی: ۲۶۳"
  },
  {
    en:"Congratulating a Groom", ur:"دلہا کو مبارکباد دینے کی دعا",
    ar:"بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    translit:"Barakallahu laka wa baraka 'alayka wa jama'a baynakuma fi khayr",
    ur_tr:"اللہ تجھے برکت دے اور تجھ پر برکت نازل کرے، اور تم دونوں کو خیر و بھلائی میں جمع رکھے۔",
    en_tr:"May Allah bless you and shower blessings upon you, and unite you both in goodness.",
    ref:"ترمذی: ۱۰۹۱"
  },
  {
    en:"Seeking Forgiveness in Laylatul-Qadr", ur:"شب قدر میں مانگنے کی دعا",
    ar:"اَللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    translit:"Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
    ur_tr:"اے اللہ! تو معاف فرمانے والا ہے، معافی کو پسند فرماتا ہے، پس مجھے معاف فرما دے۔",
    en_tr:"O Allah, You are Forgiving and love forgiveness, so forgive me.",
    ref:"ترمذی: ۳۵۱۳"
  },
  {
    en:"Sighting the New Moon", ur:"نیا چاند دیکھنے کی دعا",
    ar:"اَللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ وَالتَّوْفِيقِ لِمَا تُحِبُّ وَتَرْضَى رَبِّي وَرَبُّكَ اللَّهُ",
    translit:"Allahumma ahillahu 'alayna bil-yumni wal-imani was-salamati wal-Islami wat-tawfeeqi lima tuhibbu wa tarda, Rabbi wa Rabbukallah",
    ur_tr:"اے اللہ! اس چاند کو ہم پر برکت، ایمان، سلامتی، اسلام اور ان اعمال کی توفیق کے ساتھ نکال جن سے تو راضی ہے۔ (اے چاند) میرا اور تیرا رب اللہ ہی ہے۔",
    en_tr:"O Allah, bring this moon upon us with blessing, faith, safety, Islam, and the ability to do what You love and are pleased with. My Lord and your Lord is Allah.",
    ref:"ترمذی: ۳۴۵۱"
  },
  {
    en:"Seeing a Muslim Laugh", ur:"کسی مسلمان کو ہنستا دیکھ کر دعا دینا",
    ar:"أَضْحَكَ اللَّهُ سِنَّكَ",
    translit:"Adhakallahu sinnak",
    ur_tr:"اللہ تجھے ہنساتا رہے۔",
    en_tr:"May Allah keep you smiling/laughing.",
    ref:"بخاری: ۳۶۸۳"
  },
  {
    en:"Visiting a Sick Muslim", ur:"مریض کی عیادت کرتے وقت تسلی دینا",
    ar:"لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
    translit:"La ba'sa, tahoorun inshaa'Allah",
    ur_tr:"کچھ ڈر نہیں، اللہ کے چاہنے سے یہ بیماری تمہیں گناہوں سے پاک کرنے والی ہے۔",
    en_tr:"No harm, it will be a purification, if Allah wills.",
    ref:"بخاری: ۳۶۱۶"
  },
  {
    en:"Before Travel (Riding Dua)", ur:"سواری پر بیٹھتے وقت کی دعا",
    ar:"سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ",
    translit:"Subhanal-lazi sakhkhara lana haza wa ma kunna lahu muqrineen, wa inna ila Rabbina lamunqaliboon",
    ur_tr:"پاک ہے وہ ذات جس نے اس (سواری) کو ہمارے لیے مسخر کیا، ورنہ ہم اسے قابو میں لانے والے نہ تھے، اور بے شک ہم اپنے رب ہی کی طرف لوٹ کر جانے والے ہیں۔",
    en_tr:"Glory be to the One who has subjected this to us, for we could not have done it ourselves. And indeed, to our Lord we will return.",
    ref:"الزخرف: ۱۳-۱۴"
  },
  {
    en:"Stopping at a Place (Bus Stop / Station)", ur:"کسی منزل (بس اسٹاپ، ریلوے اسٹیشن) پر اترنے کی دعا",
    ar:"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    translit:"A'udhu bikalimatillahit-tammati min sharri ma khalaq",
    ur_tr:"اللہ کے پورے کلمات کے واسطے سے اللہ کی پناہ چاہتا ہوں اس کی مخلوق کے شر سے۔",
    en_tr:"I seek refuge in the perfect words of Allah from the evil of what He has created.",
    ref:"ترمذی: ۳۴۳۷"
  },
  {
    en:"Entering a Graveyard", ur:"قبرستان میں جانے کی دعا",
    ar:"اَلسَّلَامُ عَلَيْكُمْ يَا أَهْلَ الْقُبُورِ يَغْفِرُ اللَّهُ لَنَا وَلَكُمْ أَنْتُمْ سَلَفُنَا وَنَحْنُ بِالْأَثَرِ",
    translit:"Assalamu 'alaykum ya ahlal-qubur, yaghfirullahu lana wa lakum, antum salafuna wa nahnu bil-athar",
    ur_tr:"اے قبروں والو! تم پر سلامتی ہو، اللہ ہماری اور تمہاری مغفرت فرمائے، تم ہم سے پہلے جا چکے ہو اور ہم تمہارے پیچھے آنے والے ہیں۔",
    en_tr:"Peace be upon you, O inhabitants of the graves. May Allah forgive us and you; you have gone before us, and we will follow.",
    ref:"ترمذی: ۱۰۵۳"
  },
  {
    en:"For Parents", ur:"والدین کے لیے دعا",
    ar:"رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    translit:"Rabbir-hamhuma kama rabbayani sagheera",
    ur_tr:"اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے بچپن میں میری پرورش کی۔",
    en_tr:"My Lord, have mercy upon them as they brought me up when I was small.",
    ref:"بنی اسرائیل: ۲۴"
  },
  {
    en:"For Increase in Knowledge", ur:"علم میں اضافے کی دعا",
    ar:"رَبِّ زِدْنِي عِلْمًا",
    translit:"Rabbi zidni 'ilma",
    ur_tr:"اے میرے رب! میرے علم میں اضافہ فرما۔",
    en_tr:"My Lord, increase me in knowledge.",
    ref:"طٰہٰ: ۱۱۴"
  },
  {
    en:"For Ease in Affairs", ur:"کاموں میں آسانی کی دعا",
    ar:"رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    translit:"Rabbish-rahli sadri wa yassir li amri",
    ur_tr:"اے میرے رب! میرا سینہ کھول دے اور میرا کام میرے لیے آسان فرما۔",
    en_tr:"My Lord, expand for me my chest and ease for me my task.",
    ref:"طٰہٰ: ۲۵-۲۶"
  },
  {
    en:"When it Rains", ur:"بارش کے وقت کی دعا",
    ar:"اَللَّهُمَّ صَيِّبًا نَافِعًا",
    translit:"Allahumma sayyiban nafi'a",
    ur_tr:"اے اللہ! اسے نفع بخش بارش بنا دے۔",
    en_tr:"O Allah, (make it) a beneficial rain.",
    ref:"بخاری"
  },
  {
    en:"When in Distress", ur:"پریشانی کے وقت کی دعا",
    ar:"لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    translit:"La ilaha illa Anta subhanaka inni kuntu minaz-zalimeen",
    ur_tr:"تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی ظالموں میں سے تھا۔",
    en_tr:"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    ref:"الانبیاء: ۸۷"
  },
  {
    en:"Seeking Forgiveness (Sayyidul Istighfar)", ur:"سید الاستغفار",
    ar:"اَللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    translit:"Allahumma anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidhanbi faghfir li, fa innahu la yaghfirudh-dhunuba illa Anta",
    ur_tr:"اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، اور میں حسبِ استطاعت تیرے عہد اور وعدے پر قائم ہوں، میں اپنے کیے ہوئے کاموں کی برائی سے تیری پناہ مانگتا ہوں، میں تیری ان نعمتوں کا اقرار کرتا ہوں جو مجھ پر ہیں، اور اپنے گناہ کا اقرار کرتا ہوں، پس تو مجھے بخش دے، کیونکہ تیرے سوا کوئی گناہ نہیں بخشتا۔",
    en_tr:"O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You.",
    ref:"بخاری"
  },
];

/* ---------- Favorites (must be defined before duas list renders) ---------- */
const FAVORITES_KEY = 'deenaasan_favorite_duas';
function getFavoriteDuaIds(){
  try{ return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]'); }
  catch(e){ return []; }
}
function saveFavoriteDuaIds(ids){
  try{ localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids)); }catch(e){}
}
function toggleFavoriteDua(idx){
  let ids = getFavoriteDuaIds();
  if(ids.includes(idx)){
    ids = ids.filter(x=>x!==idx);
  } else {
    ids.push(idx);
  }
  saveFavoriteDuaIds(ids);
}

const duasList = document.getElementById('duasList');
duasList.innerHTML = DUAS.map((d, i) => duaCardHtml(d, i, '')).join('');

duasList.querySelectorAll('.dua-card').forEach(card=>{
  card.querySelector('.dua-head').addEventListener('click', (e)=>{
    if(e.target.closest('.fav-btn')) return;
    card.classList.toggle('open');
  });
});
duasList.querySelectorAll('.fav-btn').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    e.stopPropagation();
    toggleFavoriteDua(parseInt(btn.dataset.favIdx));
    btn.classList.toggle('active');
  });
});

/* ---------- Text-to-speech "Listen" buttons (duas + tasbeeh) ---------- */
function LISTEN_HTML(){ return L3('🔊 سنیں','🔊 Listen','🔊 Sunein'); }
function STOP_HTML(){ return L3('⏸ رکیں','⏸ Stop','⏸ Rukein'); }

function speakArabic(text, btn){
  if(!('speechSynthesis' in window)){
    alert(T({ur:'یہ ڈیوائس آواز میں پڑھنے کو سپورٹ نہیں کرتی۔', en:'This device does not support text-to-speech.', roman:'Yeh device awaz mein parhne ko support nahi karti.'}));
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ar-SA';
  utter.rate = 0.8;
  document.querySelectorAll('.listen-btn').forEach(b=>{ b.classList.remove('speaking'); b.innerHTML = LISTEN_HTML(); });
  if(btn){
    btn.classList.add('speaking');
    btn.innerHTML = STOP_HTML();
  }
  utter.onend = ()=>{
    if(btn){ btn.classList.remove('speaking'); btn.innerHTML = LISTEN_HTML(); }
  };
  window.speechSynthesis.speak(utter);
}

document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.listen-btn');
  if(!btn) return;
  e.stopPropagation();
  if(btn.classList.contains('speaking')){
    window.speechSynthesis.cancel();
    btn.classList.remove('speaking');
    btn.innerHTML = LISTEN_HTML();
    return;
  }
  const source = btn.dataset.listenSource;
  const idx = btn.dataset.listenIdx;
  let text = '';
  if(source === 'dua') text = DUAS[idx].ar;
  else if(source === 'tasbeeh') text = (POPULAR_AZKAR.find(a=>a.id===idx) || {}).ar || '';
  else if(source === 'kalima') text = (KALIMAY[idx] || {}).ar || '';
  if(text) speakArabic(text, btn);
});

/* ============================================================
   TASBEEH COUNTER
   ============================================================ */
const POPULAR_AZKAR = [
  {id:'t1', cat:'حمد و ثنا', ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', ur:'اللہ پاک ہے اور اسی کی تعریف کے ساتھ۔'},
  {id:'t2', cat:'توبہ و استغفار', ar:'أَسْتَغْفِرُ اللَّهَ', ur:'میں اللہ سے بخشش مانگتا ہوں۔'},
  {id:'t3', cat:'کلمہ توحید', ar:'لَا إِلَٰهَ إِلَّا اللَّهُ', ur:'اللہ کے سوا کوئی معبود نہیں۔'},
  {id:'t4', cat:'درود شریف', ar:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ', ur:'اے اللہ! محمد اور ان کی آل پر رحمت نازل فرما۔'},
  {id:'t5', cat:'بھروسہ و توکل', ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', ur:'ہمارے لیے اللہ کافی ہے اور وہ بہترین کارساز ہے۔'},
  {id:'t6', cat:'طاقت و قوت', ar:'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', ur:'اللہ کی مدد کے بغیر نہ کوئی طاقت ہے نہ قوت۔'},
  {id:'t7', cat:'تسبیح عظیم', ar:'سُبْحَانَ اللَّهِ الْعَظِيمِ وَبِحَمْدِهِ', ur:'اللہ بزرگ و برتر پاک ہے اور اسی کی تعریف کے ساتھ۔'},
  {id:'t8', cat:'سلام پھیرنے کے بعد', ar:'سُبْحَانَ اللَّهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللَّهُ أَكْبَرُ (٣٤)', ur:'نماز کے بعد کی مشہور تسبیح — سبحان اللہ، الحمدللہ، اللہ اکبر۔'},
  {id:'t9', cat:'شکر گزاری', ar:'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', ur:'تمام تعریفیں اللہ کے لیے ہیں جو سارے جہانوں کا رب ہے۔'},
  {id:'t10', cat:'عظمتِ الٰہی', ar:'اللَّهُ أَكْبَرُ كَبِيرًا', ur:'اللہ سب سے بڑا ہے، بہت بڑا۔'},
  {id:'t11', cat:'دعائے موسیٰ علیہ السلام (حاجت کے وقت)', ar:'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ', ur:'اے میرے رب! جو بھلائی بھی تو میری طرف نازل فرمائے، میں اس کا محتاج ہوں۔'},
];

const TSB_ADDED_KEY = 'deenaasan_tasbeeh_added';
const TSB_COUNT_PREFIX = 'deenaasan_tasbeeh_count_';

function getAddedTasbeehIds(){
  try{ return JSON.parse(localStorage.getItem(TSB_ADDED_KEY) || '[]'); }
  catch(e){ return []; }
}
function saveAddedTasbeehIds(ids){
  try{ localStorage.setItem(TSB_ADDED_KEY, JSON.stringify(ids)); }catch(e){}
}
function getTasbeehCount(id){
  try{ return parseInt(localStorage.getItem(TSB_COUNT_PREFIX+id) || '0'); }catch(e){ return 0; }
}
function setTasbeehCount(id, val){
  try{ localStorage.setItem(TSB_COUNT_PREFIX+id, String(val)); }catch(e){}
}

function renderPopularTasbeeh(){
  const added = getAddedTasbeehIds();
  const wrap = document.getElementById('tsbPopularList');
  wrap.innerHTML = POPULAR_AZKAR.map(item => {
    const I = AZKAR_I18N[item.id];
    return `
    <div class="tsb-card">
      <div class="tsb-cat">${L3(item.cat, I.cat.en, I.cat.ro)}</div>
      <div class="tsb-ar">${item.ar}</div>
      <div class="tsb-ur">${L3(item.ur, I.tr.en, I.tr.ro)}</div>
      <div class="tsb-card-actions">
        <button class="listen-btn" data-listen-idx="${item.id}" data-listen-source="tasbeeh">${LISTEN_HTML()}</button>
        <button class="tsb-add-btn" data-id="${item.id}">${added.includes(item.id) ? '✓' : '+'}</button>
      </div>
    </div>`;
  }).join('');
  wrap.querySelectorAll('.tsb-add-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id;
      let ids = getAddedTasbeehIds();
      if(ids.includes(id)){
        ids = ids.filter(x=>x!==id);
        btn.textContent = '+';
      } else {
        ids.push(id);
        btn.textContent = '✓';
      }
      saveAddedTasbeehIds(ids);
      renderMyTasbeeh();
    });
  });
}

function renderMyTasbeeh(){
  const ids = getAddedTasbeehIds();
  const wrap = document.getElementById('tsbMineList');
  if(ids.length === 0){
    wrap.innerHTML = `<p class="hint">${L3('ابھی کوئی ذکر شامل نہیں کیا۔ «مقبول اذکار» ٹیب سے ➕ بٹن دبائیں۔','No zikr added yet. Tap the ➕ button on the “Popular” tab.','Abhi koi zikr add nahi kiya. "Maqbool Azkaar" tab se ➕ button dabayein.')}</p>`;
    return;
  }
  wrap.innerHTML = ids.map(id=>{
    const item = POPULAR_AZKAR.find(a=>a.id===id);
    if(!item) return '';
    const count = getTasbeehCount(id);
    return `
      <div class="tsb-mine-card" data-id="${id}">
        <div class="tmc-text">
          <div class="tmc-ar">${item.ar}</div>
        </div>
        <div class="tmc-count">${count}</div>
        <button class="tmc-remove" data-remove="${id}" title="Remove">✕</button>
      </div>
    `;
  }).join('');

  wrap.querySelectorAll('.tsb-mine-card').forEach(card=>{
    card.addEventListener('click', (e)=>{
      if(e.target.closest('.tmc-remove')) return;
      openCounter(card.dataset.id);
    });
  });
  wrap.querySelectorAll('.tmc-remove').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const id = btn.dataset.remove;
      let ids2 = getAddedTasbeehIds().filter(x=>x!==id);
      saveAddedTasbeehIds(ids2);
      renderPopularTasbeeh();
      renderMyTasbeeh();
    });
  });
}

document.querySelectorAll('.tsb-subtab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.tsb-subtab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    const sub = tab.dataset.sub;
    document.getElementById('tsbPopularList').style.display = sub === 'popular' ? '' : 'none';
    document.getElementById('tsbMineList').style.display = sub === 'mine' ? '' : 'none';
    if(sub === 'mine') renderMyTasbeeh();
  });
});

let currentCounterId = null;
function openCounter(id){
  const item = POPULAR_AZKAR.find(a=>a.id===id);
  if(!item) return;
  const I = AZKAR_I18N[id];
  currentCounterId = id;
  document.getElementById('counterAr').textContent = item.ar;
  document.getElementById('counterUr').innerHTML = L3(item.ur, I.tr.en, I.tr.ro);
  document.getElementById('counterNumber').textContent = getTasbeehCount(id);
  document.getElementById('tasbeehListWrap').style.display = 'none';
  document.getElementById('tasbeehCounterWrap').style.display = 'block';
}
document.getElementById('counterTapBtn').addEventListener('click', ()=>{
  if(!currentCounterId) return;
  const newVal = getTasbeehCount(currentCounterId) + 1;
  setTasbeehCount(currentCounterId, newVal);
  document.getElementById('counterNumber').textContent = newVal;
  if(navigator.vibrate) navigator.vibrate(15);
});
document.getElementById('counterResetBtn').addEventListener('click', ()=>{
  if(!currentCounterId) return;
  setTasbeehCount(currentCounterId, 0);
  document.getElementById('counterNumber').textContent = 0;
});
document.getElementById('backFromCounter').addEventListener('click', ()=>{
  document.getElementById('tasbeehCounterWrap').style.display = 'none';
  document.getElementById('tasbeehListWrap').style.display = 'block';
  renderMyTasbeeh();
});

renderPopularTasbeeh();
renderMyTasbeeh();

/* ============================================================
   QIBLA DIRECTION
   ============================================================ */
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;
let qiblaBearing = null;
let deviceHeading = null;
let compassActive = false;

function toRad(deg){ return deg * Math.PI / 180; }
function toDeg(rad){ return rad * 180 / Math.PI; }

function calcQiblaBearing(lat, lng){
  const φ1 = toRad(lat), φ2 = toRad(KAABA_LAT);
  const Δλ = toRad(KAABA_LNG - lng);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1)*Math.sin(φ2) - Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
  let θ = toDeg(Math.atan2(y, x));
  return (θ + 360) % 360;
}

function calcDistanceKm(lat, lng){
  const R = 6371;
  const φ1 = toRad(lat), φ2 = toRad(KAABA_LAT);
  const Δφ = toRad(KAABA_LAT - lat);
  const Δλ = toRad(KAABA_LNG - lng);
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
  const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

let lastRoseRotation = 0;
let lastArrowRotation = 0;

function shortestRotation(current, target){
  // Adjust target by ±360 increments so the transform always takes the
  // shortest path from current, instead of visually spinning all the way
  // around whenever the raw angle wraps past 0°/360°.
  let diff = ((target - current + 180) % 360 + 360) % 360 - 180;
  return current + diff;
}

function updateCompassVisual(){
  const rose = document.getElementById('compassRose');
  const arrow = document.getElementById('qiblaArrow');
  if(deviceHeading !== null){
    lastRoseRotation = shortestRotation(lastRoseRotation, -deviceHeading);
    rose.style.transform = `rotate(${lastRoseRotation}deg)`;
  }
  if(qiblaBearing !== null){
    lastArrowRotation = shortestRotation(lastArrowRotation, qiblaBearing);
    arrow.style.transform = `translate(-50%,-50%) rotate(${lastArrowRotation}deg)`;
  }
}

const QIBLA_TXT = {
  find:    {ur:'📍 قبلہ معلوم کریں', en:'📍 Find Qibla', roman:'📍 Qibla maloom karein'},
  locating:{ur:'لوکیشن معلوم کی جا رہی ہے...', en:'Getting your location…', roman:'Location maloom ki ja rahi hai...'},
  info: (b, d) => ({
    ur:`قبلہ کا رخ شمال سے <b>${b}°</b> پر ہے<br><span style="font-size:11px;">کعبہ سے فاصلہ: تقریباً ${d} کلومیٹر</span>`,
    en:`The Qibla is <b>${b}°</b> from North<br><span style="font-size:11px;">Distance to the Kaaba: about ${d} km</span>`,
    roman:`Qibla shumal se <b>${b}°</b> par hai<br><span style="font-size:11px;">Kaaba se fasla: taqreeban ${d} km</span>`}),
  active:     {ur:'کمپاس فعال ہے — فون کو سیدھا رکھیں۔', en:'Compass is active — keep the phone flat.', roman:'Compass active hai — phone ko flat rakhein.'},
  permDenied: {ur:'کمپاس کی اجازت نہیں ملی — صرف اوپر دیا گیا قبلہ کا زاویہ دیکھیں۔', en:'Compass permission was not granted — use the Qibla angle shown above.', roman:'Compass ki ijazat nahi mili — sirf upar diya gaya Qibla ka zaviya dekhein.'},
  unavailable:{ur:'کمپاس دستیاب نہیں — صرف اوپر دیا گیا قبلہ کا زاویہ دیکھیں۔', en:'Compass is not available — use the Qibla angle shown above.', roman:'Compass dastyab nahi — sirf upar diya gaya Qibla ka zaviya dekhein.'},
  noLive:     {ur:'اس ڈیوائس پر لائیو کمپاس دستیاب نہیں — اوپر دیا گیا زاویہ کسی کمپاس ایپ کے ساتھ ملائیں۔', en:'Live compass is not available on this device — match the angle above using any compass app.', roman:'Is device par live compass dastyab nahi — upar diya gaya zaviya kisi compass app ke sath milayein.'},
  geoUnsupported:{ur:'یہ ڈیوائس لوکیشن کو سپورٹ نہیں کرتی۔', en:'This device does not support location.', roman:'Yeh device location support nahi karti.'},
  geoDenied:  {ur:'لوکیشن کی اجازت نہیں ملی — براہِ کرم اجازت دیں اور دوبارہ کوشش کریں۔', en:'Location permission was not granted — please allow it and try again.', roman:'Location ki ijazat nahi mili — meherbani karke ijazat dein aur dobara koshish karein.'}
};
window.qiblaState = null;

function renderQiblaTexts(){
  const st = window.qiblaState;
  if(!st) return;
  const infoEl = document.getElementById('qiblaInfoText');
  const statusEl = document.getElementById('compassStatusText');
  const btn = document.getElementById('findQiblaBtn');
  if(st.info) infoEl.innerHTML = T(QIBLA_TXT.info(st.info.b, st.info.d));
  else if(st.infoKey) infoEl.textContent = T(QIBLA_TXT[st.infoKey]);
  if(st.status) statusEl.textContent = T(QIBLA_TXT[st.status]);
  if(st.locating) btn.textContent = T(QIBLA_TXT.locating);
}
function setQiblaStatus(key){
  window.qiblaState = window.qiblaState || {};
  if(window.qiblaState.status === key) return;
  window.qiblaState.status = key;
  renderQiblaTexts();
}
function showQiblaError(key){
  window.qiblaState = {infoKey: key};
  document.getElementById('findQiblaBtn').textContent = T(QIBLA_TXT.find);
  document.getElementById('qiblaStart').style.display = 'block';
  document.getElementById('qiblaResult').style.display = 'block';
  document.querySelector('#qiblaResult .compass-wrap').style.display = 'none';
  document.getElementById('compassStatusText').style.display = 'none';
  renderQiblaTexts();
}

let lastCompassUpdate = 0;
function handleOrientation(event){
  let heading = null;
  if(typeof event.webkitCompassHeading === 'number'){
    heading = event.webkitCompassHeading; // iOS: already true heading
  } else if(event.alpha !== null && event.absolute){
    heading = 360 - event.alpha;
  } else if(event.alpha !== null){
    heading = 360 - event.alpha; // best-effort on devices without 'absolute'
  }
  if(heading !== null){
    const now = Date.now();
    if(now - lastCompassUpdate < 120) return; // throttle: avoid overlapping animations from rapid sensor events
    lastCompassUpdate = now;
    deviceHeading = heading;
    compassActive = true;
    setQiblaStatus('active');
    updateCompassVisual();
  }
}

async function startCompass(){
  if(typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function'){
    try{
      const perm = await DeviceOrientationEvent.requestPermission();
      if(perm !== 'granted'){
        setQiblaStatus('permDenied');
        return;
      }
    }catch(e){
      setQiblaStatus('unavailable');
      return;
    }
  }
  window.addEventListener('deviceorientationabsolute', handleOrientation, true);
  window.addEventListener('deviceorientation', handleOrientation, true);
  setTimeout(()=>{
    if(!compassActive) setQiblaStatus('noLive');
  }, 2500);
}

document.getElementById('findQiblaBtn').addEventListener('click', ()=>{
  if(!navigator.geolocation){
    showQiblaError('geoUnsupported');
    return;
  }
  window.qiblaState = {locating:true};
  document.getElementById('findQiblaBtn').textContent = T(QIBLA_TXT.locating);
  navigator.geolocation.getCurrentPosition(
    (pos)=>{
      const lat = pos.coords.latitude, lng = pos.coords.longitude;
      qiblaBearing = calcQiblaBearing(lat, lng);
      const distanceKm = calcDistanceKm(lat, lng);

      window.qiblaState = {info:{b:Math.round(qiblaBearing), d:distanceKm.toLocaleString('en-US')}};
      document.getElementById('findQiblaBtn').textContent = T(QIBLA_TXT.find);
      document.getElementById('qiblaStart').style.display = 'none';
      document.getElementById('qiblaResult').style.display = 'block';
      document.querySelector('#qiblaResult .compass-wrap').style.display = '';
      document.getElementById('compassStatusText').style.display = '';
      renderQiblaTexts();
      updateCompassVisual();
      startCompass();
    },
    ()=>{ showQiblaError('geoDenied'); }
  );
});

/* ============================================================
   HIJRI CALENDAR
   ============================================================ */
const today = new Date();
let hijriCalMonth = today.getMonth() + 1;
let hijriCalYear = today.getFullYear();
let hijriLoadedOnce = false;

// Islamic occasions keyed by "hijriMonthNumber-hijriDay"
const ISLAMIC_EVENTS = {
  '1-1':  {ur:'اسلامی نیا سال', en:'Islamic New Year', roman:'Islami Naya Saal'},
  '1-10': {ur:'یومِ عاشورا', en:'Day of Ashura', roman:'Youm-e-Ashura'},
  '3-12': {ur:'میلاد النبی ﷺ', en:'Mawlid al-Nabi ﷺ', roman:'Milad-un-Nabi ﷺ'},
  '9-1':  {ur:'رمضان شروع', en:'Ramadan begins', roman:'Ramadan shuru'},
  '9-27': {ur:'شبِ قدر (ممکنہ)', en:'Laylat al-Qadr (possible)', roman:'Shab-e-Qadr (mumkina)'},
  '10-1': {ur:'عید الفطر', en:'Eid al-Fitr', roman:'Eid-ul-Fitr'},
  '12-8': {ur:'یومِ ترویہ', en:'Day of Tarwiyah', roman:'Youm-e-Tarwiyah'},
  '12-9': {ur:'یومِ عرفہ', en:'Day of Arafah', roman:'Youm-e-Arafah'},
  '12-10':{ur:'عید الاضحی', en:'Eid al-Adha', roman:'Eid-ul-Adha'}
};
const HIJRI_TXT = {
  loading:    {ur:'لوڈ ہو رہا ہے...', en:'Loading…', roman:'Load ho raha hai...'},
  error:      {ur:'کیلنڈر لوڈ نہیں ہو سکا۔ براہِ کرم دوبارہ کوشش کریں۔', en:'Could not load the calendar. Please try again.', roman:'Calendar load nahi ho saka. Meherbani karke dobara koshish karein.'},
  eventsTitle:{ur:'اس مہینے کی اہم تاریخیں', en:'Important dates this month', roman:'Is mahine ki ahem tareekhein'}
};
window.lastHijriDays = null;

async function loadHijriCalendar(){
  hijriLoadedOnce = true;
  const grid = document.getElementById('hijriGrid');
  grid.innerHTML = `<div class="loading">${T(HIJRI_TXT.loading)}</div>`;
  try{
    const res = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${hijriCalMonth}/${hijriCalYear}`);
    const data = await res.json();
    window.lastHijriDays = data.data;
    renderHijriCalendar(data.data);
  }catch(err){
    hijriLoadedOnce = false;
    window.lastHijriDays = null;
    document.getElementById('hijriEvents').innerHTML = '';
    grid.innerHTML = `<div class="error-box">${T(HIJRI_TXT.error)}</div>`;
  }
}

function renderHijriCalendar(days){
  const grid = document.getElementById('hijriGrid');
  const todayStr = today.toLocaleDateString('en-GB').split('/').join('-'); // DD-MM-YYYY

  // Title: hijri month of the 15th (mid-month) as the "primary" hijri month for this Gregorian month
  const midDay = days[Math.min(14, days.length-1)];
  document.getElementById('hijriMonthTitle').textContent =
    `${midDay.hijri.month.ar} ${midDay.hijri.year} ھ`;
  document.getElementById('gregMonthTitle').textContent =
    new Date(hijriCalYear, hijriCalMonth-1, 1).toLocaleDateString('en-GB', {month:'long', year:'numeric'});

  // Week starts on Monday: Monday=0 ... Sunday=6
  const firstDate = new Date(hijriCalYear, hijriCalMonth-1, 1);
  const leadingEmpty = (firstDate.getDay() + 6) % 7;

  let html = '';
  for(let i=0;i<leadingEmpty;i++){ html += '<div class="hijri-day empty"></div>'; }

  const events = [];
  days.forEach(d=>{
    const gDay = parseInt(d.gregorian.day);
    const hDay = parseInt(d.hijri.day);
    const hMonthNum = parseInt(d.hijri.month.number);
    const isToday = d.gregorian.date === todayStr;
    const ev = ISLAMIC_EVENTS[`${hMonthNum}-${hDay}`];
    if(ev) events.push({g:`${gDay} ${d.gregorian.month.en}`, h:`${hDay} ${d.hijri.month.en}`, ev});
    html += `
      <div class="hijri-day ${isToday ? 'is-today' : ''} ${ev ? 'is-event' : ''}">
        <div class="hd-hijri">${hDay}</div>
        <div class="hd-greg">${gDay}</div>
      </div>
    `;
  });

  grid.innerHTML = html;
  document.getElementById('hijriEvents').innerHTML = events.length
    ? `<div class="he-title">${T(HIJRI_TXT.eventsTitle)}</div>` +
      events.map(x => `<div class="he-row"><span class="he-date">${x.h} · ${x.g}</span><span class="he-name">${T(x.ev)}</span></div>`).join('')
    : '';
}

document.getElementById('hijriPrevBtn').addEventListener('click', ()=>{
  hijriCalMonth--;
  if(hijriCalMonth < 1){ hijriCalMonth = 12; hijriCalYear--; }
  loadHijriCalendar();
});
document.getElementById('hijriNextBtn').addEventListener('click', ()=>{
  hijriCalMonth++;
  if(hijriCalMonth > 12){ hijriCalMonth = 1; hijriCalYear++; }
  loadHijriCalendar();
});

/* ============================================================
   ZAKAT CALCULATOR
   ============================================================ */
const GOLD_NISAB_GRAMS = 87.48;
const SILVER_NISAB_GRAMS = 612.36;
const ZAKAT_RATE = 0.025;

function numVal(id){
  const v = parseFloat(document.getElementById(id).value);
  return isNaN(v) ? 0 : v;
}

const ZAKAT_TXT = {
  priceMissing: {
    gold:  {ur:'براہِ کرم سونے کی موجودہ قیمت فی گرام درج کریں۔', en:'Please enter the current gold price per gram.', roman:'Meherbani karke sone ki maujooda qeemat fi gram zaroor darj karein.'},
    silver:{ur:'براہِ کرم چاندی کی موجودہ قیمت فی گرام درج کریں۔', en:'Please enter the current silver price per gram.', roman:'Meherbani karke chandi ki maujooda qeemat fi gram zaroor darj karein.'}
  },
  due:    {ur:'آپ کی زکوٰۃ بنتی ہے', en:'Your Zakat is due', roman:'Aap ki zakat banti hai'},
  notDue: {ur:'نصاب مکمل نہیں — زکوٰۃ واجب نہیں', en:'Nisab not reached — Zakat is not due', roman:'Nisab mukammal nahi — zakat wajib nahi'},
  noteDue:{ur:'یہ رقم آپ کے کل مال کا 2.5٪ ہے (آپ کی بتائی ہوئی کرنسی میں)۔', en:'This is 2.5% of your total wealth (in the currency you entered).', roman:'Yeh raqam aap ke kul maal ka 2.5% hai (aap ki batayi hui currency mein).'},
  noteNotDue:(net, nisab)=>({
    ur:`آپ کا کل مال (${net}) نصاب (${nisab}) سے کم ہے، اس لیے اس وقت زکوٰۃ واجب نہیں۔`,
    en:`Your net wealth (${net}) is below the nisab (${nisab}), so Zakat is not due at this time.`,
    roman:`Aap ka kul maal (${net}) nisab (${nisab}) se kam hai, is liye is waqt zakat wajib nahi.`}),
  rows:{
    cash:      {ur:'نقدی', en:'Cash', roman:'Naqdi'},
    gold:      {ur:'سونا (قیمت)', en:'Gold value', roman:'Sona (qeemat)'},
    silver:    {ur:'چاندی (قیمت)', en:'Silver value', roman:'Chandi (qeemat)'},
    business:  {ur:'کاروبار', en:'Business', roman:'Karobar'},
    investments:{ur:'سرمایہ کاری', en:'Investments', roman:'Sarmaya kari'},
    receivables:{ur:'واپس ملنے والی رقم', en:'Receivables', roman:'Wapas milne wali raqam'},
    total:     {ur:'مجموعی مال', en:'Total assets', roman:'Majmoi maal'},
    debts:     {ur:'منفی: قرض', en:'Minus: debts', roman:'Minus: qarz'},
    net:       {ur:'خالص مال', en:'Net wealth', roman:'Khalis maal'},
    nisab:     {ur:'نصاب', en:'Nisab threshold', roman:'Nisab'}
  }
};
window.lastZakat = null;

document.getElementById('calcZakatBtn').addEventListener('click', ()=>{
  const goldPrice = numVal('goldPricePerGram');
  const silverPrice = numVal('silverPricePerGram');
  const basis = document.getElementById('nisabBasis').value;

  if((basis === 'gold' && goldPrice <= 0) || (basis === 'silver' && silverPrice <= 0)){
    window.lastZakat = {error: basis};
    renderZakatResult();
    return;
  }

  const cash = numVal('zCash');
  const goldValue = numVal('zGoldGrams') * (goldPrice || 0);
  const silverValue = numVal('zSilverGrams') * (silverPrice || 0);
  const business = numVal('zBusiness');
  const investments = numVal('zInvestments');
  const receivables = numVal('zReceivables');
  const debts = numVal('zDebts');

  const totalAssets = cash + goldValue + silverValue + business + investments + receivables;
  const netWealth = totalAssets - debts;
  const nisabValue = basis === 'gold' ? GOLD_NISAB_GRAMS * goldPrice : SILVER_NISAB_GRAMS * silverPrice;
  const isEligible = netWealth >= nisabValue;

  window.lastZakat = {cash, goldValue, silverValue, business, investments, receivables, debts,
                      totalAssets, netWealth, nisabValue, isEligible,
                      zakatDue: isEligible ? netWealth * ZAKAT_RATE : 0};
  renderZakatResult();
  document.getElementById('zakatResult').scrollIntoView({behavior:'smooth', block:'nearest'});
});

function renderZakatResult(){
  const box = document.getElementById('zakatResult');
  const z = window.lastZakat;
  if(!z){ box.innerHTML = ''; return; }
  if(z.error){
    box.innerHTML = `<div class="error-box">${T(ZAKAT_TXT.priceMissing[z.error])}</div>`;
    return;
  }
  const fmt = (n)=> Math.round(n).toLocaleString('en-US');
  const R = ZAKAT_TXT.rows;
  const rows = [
    ['cash', fmt(z.cash)], ['gold', fmt(z.goldValue)], ['silver', fmt(z.silverValue)],
    ['business', fmt(z.business)], ['investments', fmt(z.investments)], ['receivables', fmt(z.receivables)],
    ['total', fmt(z.totalAssets)], ['debts', '-' + fmt(z.debts)], ['net', fmt(z.netWealth)], ['nisab', fmt(z.nisabValue)]
  ];
  box.innerHTML = `
    <div class="zakat-result-card">
      <div class="zr-label">${T(z.isEligible ? ZAKAT_TXT.due : ZAKAT_TXT.notDue)}</div>
      <div class="zr-amount">${z.isEligible ? fmt(z.zakatDue) : '0'}</div>
      <div class="zr-note">${T(z.isEligible ? ZAKAT_TXT.noteDue : ZAKAT_TXT.noteNotDue(fmt(z.netWealth), fmt(z.nisabValue)))}</div>
    </div>
    <div class="zakat-breakdown">
      ${rows.map(([k, v]) => `<div class="zb-row"><span>${T(R[k])}</span><span>${v}</span></div>`).join('')}
    </div>`;
}

/* ============================================================
   QAZA NAMAZ TRACKER
   ============================================================ */
const QAZA_PRAYERS = [
  {key:'fajr', en:'Fajr', ur:'فجر'},
  {key:'dhuhr', en:'Dhuhr', ur:'ظہر'},
  {key:'asr', en:'Asr', ur:'عصر'},
  {key:'maghrib', en:'Maghrib', ur:'مغرب'},
  {key:'isha', en:'Isha', ur:'عشاء'},
];
const QAZA_STORAGE_KEY = 'deenaasan_qaza_counts';

function getQazaCounts(){
  try{
    return JSON.parse(localStorage.getItem(QAZA_STORAGE_KEY) || '{}');
  }catch(e){ return {}; }
}
function saveQazaCounts(counts){
  try{ localStorage.setItem(QAZA_STORAGE_KEY, JSON.stringify(counts)); }catch(e){}
}

function renderQazaList(){
  const counts = getQazaCounts();
  const list = document.getElementById('qazaList');
  list.innerHTML = QAZA_PRAYERS.map(p => `
    <div class="qaza-row">
      <button class="qaza-btn minus" data-key="${p.key}" data-action="dec">−</button>
      <div class="qr-name">
        <div class="qr-en">${p.en}</div>
        ${curLang()==='ur' ? `<div class="qr-ur">${p.ur}</div>` : ''}
      </div>
      <div class="qr-count">${counts[p.key] || 0}</div>
      <button class="qaza-btn plus" data-key="${p.key}" data-action="inc">+</button>
    </div>
  `).join('');

  list.querySelectorAll('.qaza-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const key = btn.dataset.key;
      const counts2 = getQazaCounts();
      const current = counts2[key] || 0;
      if(btn.dataset.action === 'inc'){
        counts2[key] = current + 1;
      } else {
        counts2[key] = Math.max(0, current - 1);
      }
      saveQazaCounts(counts2);
      renderQazaList();
    });
  });

  updateQazaTotal(counts);
}

function updateQazaTotal(counts){
  const total = QAZA_PRAYERS.reduce((sum,p)=> sum + (counts[p.key] || 0), 0);
  document.getElementById('qazaTotal').innerHTML = `
    <div class="qt-num">${total}</div>
    <div class="qt-label">${T({ur:'کل باقی قضا نمازیں', en:'Total remaining Qaza prayers', roman:'Kul baqi Qaza namazein'})}</div>
  `;
}

document.getElementById('qazaResetBtn').addEventListener('click', ()=>{
  if(confirm(T({ur:'کیا آپ واقعی تمام قضا نمازوں کا حساب ری سیٹ کرنا چاہتے ہیں؟', en:'Do you really want to reset all Qaza counts?', roman:'Kya aap sach mein sab qaza namazon ka hisaab reset karna chahte hain?'}))){
    saveQazaCounts({});
    renderQazaList();
  }
});

/* ============================================================
   LOCAL MASJID TIMES (community-submitted, Firestore-backed)
   ============================================================ */
const MASJID_PRAYERS = [
  {key:'fajr', ur:'فجر'}, {key:'dhuhr', ur:'ظہر'}, {key:'asr', ur:'عصر'},
  {key:'maghrib', ur:'مغرب'}, {key:'isha', ur:'عشاء'},
];

function notConfiguredNotice(){
  return `<div class="masjid-notice">${L3(`یہ فیچر ابھی سیٹ اپ ہو رہا ہے — تھوڑی دیر میں دوبارہ دیکھیں۔`,`This feature is still being set up — please check back soon.`,`Yeh feature abhi setup ho raha hai — thori dair mein dobara check karein.`)}</div>`;
}

async function searchMasjids(city){
  const list = document.getElementById('masjidList');
  if(!firebaseDb){
    list.innerHTML = notConfiguredNotice();
    return;
  }
  list.innerHTML = `<div class="loading">${L3(`تلاش کیا جا رہا ہے...`,`Searching…`,`Dhoonda ja raha hai...`)}</div>`;
  try{
    const cityLower = city.trim().toLowerCase();
    const snapshot = await firebaseDb.collection('masjids')
      .where('cityLower', '==', cityLower)
      .limit(30)
      .get();

    if(snapshot.empty){
      list.innerHTML = `<div class="masjid-notice">${L3(`اس علاقے میں ابھی کوئی مسجد درج نہیں ہے۔ پہلی مسجد شامل کرنے والے بنیں!`,`No masjid has been added for this area yet — be the first to add one!`,`Is ilaqe mein abhi koi masjid record nahi mili. Pehla add karne wale banayein!`)}</div>`;
      return;
    }
    const docs = snapshot.docs.slice().sort((a,b)=>{
      const ta = a.data().createdAt ? a.data().createdAt.toMillis() : 0;
      const tb = b.data().createdAt ? b.data().createdAt.toMillis() : 0;
      return tb - ta;
    });
    list.innerHTML = docs.map(doc=>{
      const m = doc.data();
      return `
        <div class="masjid-card">
          <div class="mc-name">${m.name}</div>
          <div class="mc-city">📍 ${m.city}</div>
          <div class="masjid-times-row">
            ${MASJID_PRAYERS.map(p=>`
              <div class="mt-item">
                <div class="mt-name">${L3(p.ur, p.key[0].toUpperCase()+p.key.slice(1), p.key[0].toUpperCase()+p.key.slice(1))}</div>
                <div class="mt-time">${m[p.key] || '—'}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }catch(err){
    list.innerHTML = `<div class="error-box">${L3(`مساجد کی فہرست لوڈ نہیں ہو سکی۔ دوبارہ کوشش کریں۔`,`Could not load the masjid list — please try again.`,`Masjid list load nahi ho saki. Dobara koshish karein.`)}</div>`;
  }
}

document.getElementById('searchMasjidBtn').addEventListener('click', ()=>{
  const city = document.getElementById('masjidCitySearch').value.trim();
  if(!city){
    document.getElementById('masjidList').innerHTML = `<div class="error-box">${L3(`براہِ کرم شہر یا علاقے کا نام لکھیں۔`,`Please enter the name of a city or area.`,`Meherbani karke shehar ya ilaqe ka naam likhein.`)}</div>`;
    return;
  }
  searchMasjids(city);
});

document.getElementById('addMasjidBtn').addEventListener('click', ()=>{
  document.getElementById('addMasjidForm').style.display = 'block';
  document.getElementById('addMasjidForm').scrollIntoView({behavior:'smooth'});
});
document.getElementById('cancelMasjidBtn').addEventListener('click', ()=>{
  document.getElementById('addMasjidForm').style.display = 'none';
});

document.getElementById('submitMasjidBtn').addEventListener('click', async ()=>{
  if(!firebaseDb){
    alert(T({ur:`یہ فیچر ابھی سیٹ اپ ہو رہا ہے۔`, en:`This feature is still being set up.`, roman:`Yeh feature abhi setup ho raha hai.`}));
    return;
  }
  const name = document.getElementById('newMasjidName').value.trim();
  const city = document.getElementById('newMasjidCity').value.trim();
  const fajr = document.getElementById('newMasjidFajr').value.trim();
  const dhuhr = document.getElementById('newMasjidDhuhr').value.trim();
  const asr = document.getElementById('newMasjidAsr').value.trim();
  const maghrib = document.getElementById('newMasjidMaghrib').value.trim();
  const isha = document.getElementById('newMasjidIsha').value.trim();

  if(!name || !city){
    alert(T({ur:`براہِ کرم مسجد کا نام اور شہر/علاقہ ضرور لکھیں۔`, en:`Please enter the masjid name and the city/area.`, roman:`Meherbani karke masjid ka naam aur shehar/ilaqa zaroor likhein.`}));
    return;
  }

  const submitBtn = document.getElementById('submitMasjidBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = T({ur:`شامل ہو رہا ہے...`, en:`Adding…`, roman:`Shamil ho raha hai...`});

  try{
    await firebaseDb.collection('masjids').add({
      name, city,
      cityLower: city.toLowerCase(),
      fajr, dhuhr, asr, maghrib, isha,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    document.getElementById('addMasjidForm').style.display = 'none';
    ['newMasjidName','newMasjidCity','newMasjidFajr','newMasjidDhuhr','newMasjidAsr','newMasjidMaghrib','newMasjidIsha']
      .forEach(id => document.getElementById(id).value = '');
    document.getElementById('masjidCitySearch').value = city;
    searchMasjids(city);
  }catch(err){
    alert(T({ur:`مسجد شامل نہیں ہو سکی، دوبارہ کوشش کریں۔`, en:`Could not add the masjid — please try again.`, roman:`Masjid shamil nahi ho saki, dobara koshish karein.`}));
  }finally{
    submitBtn.disabled = false;
    submitBtn.textContent = T({ur:`شامل کریں`, en:`Add`, roman:`Shamil karein`});
  }
});

/* ============================================================
   GROUP KHATM TRACKER (community-shared, Firestore-backed)
   ============================================================ */
const KHATM_MY_GROUPS_KEY = 'deenaasan_khatm_my_groups'; // array of {id, name, code}
let currentKhatmGroupId = null;

function getMyKhatmGroups(){
  try{ return JSON.parse(localStorage.getItem(KHATM_MY_GROUPS_KEY) || '[]'); }
  catch(e){ return []; }
}
function saveMyKhatmGroups(groups){
  try{ localStorage.setItem(KHATM_MY_GROUPS_KEY, JSON.stringify(groups)); }catch(e){}
}
function addMyKhatmGroup(id, name, code){
  const groups = getMyKhatmGroups();
  if(!groups.find(g=>g.id===id)){
    groups.unshift({id, name, code});
    saveMyKhatmGroups(groups);
  }
}
function generateKhatmCode(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for(let i=0;i<6;i++) code += chars[Math.floor(Math.random()*chars.length)];
  return code;
}

function showKhatmEntry(){
  document.getElementById('khatmGroupWrap').style.display = 'none';
  document.getElementById('khatmEntryWrap').style.display = 'block';
  renderMyKhatmGroupsList();
}

function renderMyKhatmGroupsList(){
  const wrap = document.getElementById('myKhatmGroupsWrap');
  const groups = getMyKhatmGroups();
  if(groups.length === 0){ wrap.innerHTML = ''; return; }
  wrap.innerHTML = `
    <div class="section-head" style="margin-top:20px;">
      <h2>My Groups</h2>
      <span class="ur-h">${L3('میرے گروپس','','Mere Groups')}</span>
    </div>
  ` + groups.map(g => `
    <div class="khatm-my-group-card" data-id="${g.id}">
      <div class="kmg-name">${g.name}</div>
      <div class="kmg-progress" id="kmgProgress-${g.id}">...</div>
    </div>
  `).join('');

  wrap.querySelectorAll('.khatm-my-group-card').forEach(card=>{
    card.addEventListener('click', ()=> openKhatmGroup(card.dataset.id));
    // fetch quick progress preview
    if(firebaseDb){
      firebaseDb.collection('khatm_groups').doc(card.dataset.id).get().then(doc=>{
        if(!doc.exists) return;
        const paras = doc.data().paras || {};
        const done = Object.values(paras).filter(Boolean).length;
        const el = document.getElementById('kmgProgress-'+card.dataset.id);
        if(el) el.textContent = `${done}/30`;
      }).catch(()=>{});
    }
  });
}

if(!firebaseDb){
  // keep entry screen usable but show notice lazily when actions are attempted
}

document.getElementById('createKhatmBtn').addEventListener('click', async ()=>{
  if(!firebaseDb){ alert(T({ur:`یہ فیچر ابھی سیٹ اپ ہو رہا ہے۔`, en:`This feature is still being set up.`, roman:`Yeh feature abhi setup ho raha hai.`})); return; }
  const name = document.getElementById('newKhatmName').value.trim();
  if(!name){ alert(T({ur:`براہِ کرم گروپ کا نام لکھیں۔`, en:`Please enter a group name.`, roman:`Meherbani karke group ka naam likhein.`})); return; }

  const btn = document.getElementById('createKhatmBtn');
  btn.disabled = true; btn.textContent = T({ur:`بن رہا ہے...`, en:`Creating…`, roman:`Ban raha hai...`});
  try{
    const code = generateKhatmCode();
    const emptyParas = {};
    for(let i=1;i<=30;i++) emptyParas[i] = false;
    const docRef = await firebaseDb.collection('khatm_groups').add({
      name, code, paras: emptyParas,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    addMyKhatmGroup(docRef.id, name, code);
    document.getElementById('newKhatmName').value = '';
    openKhatmGroup(docRef.id);
  }catch(err){
    alert(T({ur:`گروپ نہیں بن سکا، دوبارہ کوشش کریں۔`, en:`Could not create the group — please try again.`, roman:`Group nahi ban saka, dobara koshish karein.`}));
  }finally{
    btn.disabled = false; btn.textContent = T({ur:`➕ نیا گروپ بنائیں`, en:`➕ Create new group`, roman:`➕ Naya group banayein`});
  }
});

document.getElementById('joinKhatmBtn').addEventListener('click', async ()=>{
  if(!firebaseDb){ alert(T({ur:`یہ فیچر ابھی سیٹ اپ ہو رہا ہے۔`, en:`This feature is still being set up.`, roman:`Yeh feature abhi setup ho raha hai.`})); return; }
  const code = document.getElementById('joinKhatmCode').value.trim().toUpperCase();
  if(!code){ alert(T({ur:`براہِ کرم گروپ کوڈ لکھیں۔`, en:`Please enter the group code.`, roman:`Meherbani karke group code likhein.`})); return; }

  const btn = document.getElementById('joinKhatmBtn');
  btn.disabled = true; btn.textContent = T({ur:`تلاش کیا جا رہا ہے...`, en:`Searching…`, roman:`Dhoonda ja raha hai...`});
  try{
    const snapshot = await firebaseDb.collection('khatm_groups').where('code','==',code).limit(1).get();
    if(snapshot.empty){
      alert(T({ur:`یہ کوڈ نہیں ملا۔ دوبارہ چیک کریں۔`, en:`This code was not found. Please check it again.`, roman:`Yeh code nahi mila. Dobara check karein.`}));
      return;
    }
    const doc = snapshot.docs[0];
    addMyKhatmGroup(doc.id, doc.data().name, doc.data().code);
    document.getElementById('joinKhatmCode').value = '';
    openKhatmGroup(doc.id);
  }catch(err){
    alert(T({ur:`گروپ تلاش کرنے میں مسئلہ ہوا، دوبارہ کوشش کریں۔`, en:`There was a problem finding the group — please try again.`, roman:`Group dhoondne mein masla hua, dobara koshish karein.`}));
  }finally{
    btn.disabled = false; btn.textContent = T({ur:`🔑 گروپ میں شامل ہوں`, en:`🔑 Join group`, roman:`🔑 Group join karein`});
  }
});

async function openKhatmGroup(groupId){
  if(!firebaseDb) return;
  currentKhatmGroupId = groupId;
  document.getElementById('khatmEntryWrap').style.display = 'none';
  document.getElementById('khatmGroupWrap').style.display = 'block';
  document.getElementById('khatmParaGrid').innerHTML = `<div class="loading">${L3(`لوڈ ہو رہا ہے...`,`Loading…`,`Load ho raha hai...`)}</div>`;

  try{
    const doc = await firebaseDb.collection('khatm_groups').doc(groupId).get();
    if(!doc.exists){
      document.getElementById('khatmParaGrid').innerHTML = `<div class="error-box">${L3(`یہ گروپ نہیں ملا۔`,`This group was not found.`,`Yeh group nahi mila.`)}</div>`;
      return;
    }
    renderKhatmGroup(doc.data());
  }catch(err){
    document.getElementById('khatmParaGrid').innerHTML = `<div class="error-box">${L3(`لوڈ نہیں ہو سکا، دوبارہ کوشش کریں۔`,`Could not load — please try again.`,`Load nahi ho saka, dobara koshish karein.`)}</div>`;
  }
}

function renderKhatmGroup(data){
  document.getElementById('khatmGroupName').textContent = data.name;
  document.getElementById('khatmGroupCode').textContent = data.code;

  const paras = data.paras || {};
  const done = Object.values(paras).filter(Boolean).length;
  document.getElementById('khatmProgressFill').style.width = `${(done/30)*100}%`;
  document.getElementById('khatmProgressText').innerHTML = `${L3(`${done} / 30 پارے مکمل`,`${done} / 30 Paras completed`,`${done} / 30 Para mukammal`)}`;

  const grid = document.getElementById('khatmParaGrid');
  grid.innerHTML = '';
  for(let i=1;i<=30;i++){
    const isDone = !!paras[i];
    const tile = document.createElement('div');
    tile.className = 'khatm-para-tile' + (isDone ? ' done' : '');
    tile.textContent = i;
    tile.addEventListener('click', ()=> toggleKhatmPara(i, !isDone));
    grid.appendChild(tile);
  }
}

async function toggleKhatmPara(paraNum, newValue){
  if(!currentKhatmGroupId || !firebaseDb) return;
  try{
    await firebaseDb.collection('khatm_groups').doc(currentKhatmGroupId).update({
      [`paras.${paraNum}`]: newValue
    });
    const doc = await firebaseDb.collection('khatm_groups').doc(currentKhatmGroupId).get();
    renderKhatmGroup(doc.data());
  }catch(err){
    alert(T({ur:`تبدیلی محفوظ نہیں ہو سکی، دوبارہ کوشش کریں۔`, en:`The change could not be saved — please try again.`, roman:`Update save nahi hui, dobara koshish karein.`}));
  }
}

document.getElementById('khatmShareBtn').addEventListener('click', ()=>{
  const code = document.getElementById('khatmGroupCode').textContent;
  const shareText = T({ur:`ہمارے قرآن ختم گروپ میں شامل ہوں! دین آسان ایپ کھولیں > مزید > Group Khatm Tracker > گروپ جوائن کریں، اور یہ کوڈ لکھیں: ${code}`, en:`Join our Quran Khatm group! Open the Deen Aasan app > More > Group Khatm Tracker > Join group, and enter this code: ${code}`, roman:`Hamare Quran Khatm group mein shamil hon! Deen Aasan app kholein > More > Group Khatm Tracker > Join group, aur yeh code likhein: ${code}`});
  if(navigator.share){
    navigator.share({title:'Quran Khatm Group', text: shareText}).catch(()=>{});
  } else {
    navigator.clipboard.writeText(shareText).then(()=>{
      alert(T({ur:`کوڈ کاپی ہو گیا! کہیں بھی پیسٹ کر کے دوست کو بھیج دیں۔`, en:`Code copied! Paste it anywhere to send it to a friend.`, roman:`Code copy ho gaya! Kahin bhi paste kar ke dost ko bhej dein.`}));
    }).catch(()=>{
      alert('Group Code: ' + code);
    });
  }
});

document.getElementById('backFromKhatmGroup').addEventListener('click', showKhatmEntry);

/* ============================================================
   DIL KI KAIFIYAT (Mood-based Ayat/Dua)
   ============================================================ */
const MOODS = [
  {
    id:'anxious', emoji:'😟', en:'Anxious / Worried', ur:'پریشان',
    ar:"أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    ur_tr:"سن لو! اللہ کے ذکر سے ہی دلوں کو اطمینان ملتا ہے۔",
    ref:"الرعد: ۲۸",
    note:"Jab dil bohat pareshan ho, to thoda ruk kar sukoon se allah ka zikr karein — «سبحان اللہ»، «الحمدللہ»، ya bas «اللہ» ka naam le kar sans lein. Yeh pareshani foran khatam nahi karega, lekin dil ko sahara zaroor dega۔"
  },
  {
    id:'sad', emoji:'😢', en:'Sad', ur:'غمگین',
    ar:"إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ",
    ur_tr:"میں تو اپنی پریشانی اور غم کی فریاد صرف اللہ ہی سے کرتا ہوں۔",
    ref:"یوسف: ۸۶",
    note:"Hazrat Yaqoob علیہ السلام ne apna gham Allah ke saamne rakha, kisi aur ke saamne nahi۔ Aap ka gham bhi seedha Allah tak pohnchta hai — dua mein khul kar ro lein, sharminda na hon۔"
  },
  {
    id:'hopeless', emoji:'😞', en:'Hopeless / Despair', ur:'مایوس',
    ar:"لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
    ur_tr:"اللہ کی رحمت سے مایوس مت ہو، بے شک اللہ سارے گناہ بخش دیتا ہے۔",
    ref:"الزمر: ۵۳",
    note:"Chahe kuch bhi ho chuka ho, Allah ki rehmat se umeed nahi todhni۔ Yeh ayat khaas taur par un logon ke liye nazil hui jo apne aap ko bohat gunahgaar samajhte hain — Allah ka darwaza hamesha khula hai۔"
  },
  {
    id:'grateful', emoji:'🤲', en:'Grateful', ur:'شکر گزار',
    ar:"وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    ur_tr:"اور یاد کرو جب تمہارے رب نے اعلان کیا کہ اگر تم شکر کرو گے تو میں تمہیں ضرور زیادہ دوں گا۔",
    ref:"ابراہیم: ۷",
    note:"Shukar ada karne ka sab se acha tareeqa yeh hai ke jo mila hai us par «الحمدللہ» kahein aur zaban se bhi izhaar karein۔ Allah ka wada hai ke shukar karne walon ko aur ata farmata hai۔"
  },
  {
    id:'angry', emoji:'😠', en:'Angry', ur:'غصہ',
    ar:"لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
    ur_tr:"طاقتور وہ نہیں جو کشتی میں دوسروں کو پچھاڑ دے، بلکہ طاقتور وہ ہے جو غصے کے وقت اپنے آپ پر قابو رکھے۔",
    ref:"بخاری، مسلم",
    note:"Nabi ﷺ ne farmaya: jab ghussa aaye to wazu kar lo, agar khare ho to baith jao, agar baithe ho to leit jao۔ Chhota sa amal hai magar bohat asar rakhta hai۔"
  },
  {
    id:'scared', emoji:'😰', en:'Scared / Fearful', ur:'خوفزدہ',
    ar:"حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    ur_tr:"ہمارے لیے اللہ کافی ہے اور وہ بہترین کارساز ہے۔",
    ref:"آل عمران: ۱۷۳",
    note:"Yeh wohi kalimaat hain jo Hazrat Ibrahim علیہ السلام ne aag mein daale jaate waqt kahe۔ Jis khauf mein bhi ho, Allah par bharosa rakhein — Woh sab se behtar madadgaar hai۔"
  },
  {
    id:'guidance', emoji:'🧭', en:'Need Guidance', ur:'رہنمائی چاہیے',
    ar:"اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    ur_tr:"ہمیں سیدھے راستے کی ہدایت فرما۔",
    ref:"الفاتحہ: ۶",
    note:"Yeh dua har namaz mein kam az kam 17 baar parhte hain — Allah se seedhi raah maangna sab se bara amal hai۔ Faisla mushkil ho to Salat-ul-Istikhara bhi parh sakte hain۔"
  },
  {
    id:'lonely', emoji:'🫂', en:'Lonely', ur:'تنہا',
    ar:"وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    ur_tr:"اور وہ تمہارے ساتھ ہے، تم جہاں کہیں بھی ہو۔",
    ref:"الحدید: ۴",
    note:"Chahe koi paas na ho, Allah har waqt sath hai — dekh raha hai, sun raha hai۔ Tanhai mein bhi dua karna ek aisi guftagu hai jo kabhi ignore nahi hoti۔"
  },
];

function renderMoodGrid(){
  const grid = document.getElementById('moodGrid');
  grid.innerHTML = MOODS.map(m => {
    const I = MOOD_I18N[m.id];
    return `
    <div class="mood-tile" data-id="${m.id}">
      <div class="mt-emoji">${m.emoji}</div>
      <div class="mt-en">${L3(m.ur, I.label.en, I.label.ro)}</div>
    </div>`;
  }).join('');
  grid.querySelectorAll('.mood-tile').forEach(tile=>{
    tile.addEventListener('click', ()=> showMoodResult(tile.dataset.id));
  });
}

function showMoodResult(moodId){
  const m = MOODS.find(x=>x.id===moodId);
  if(!m) return;
  const I = MOOD_I18N[moodId];
  document.getElementById('moodPickerWrap').style.display = 'none';
  document.getElementById('moodResultWrap').style.display = 'block';
  document.getElementById('moodResultCard').innerHTML = `
    <div class="mr-ar">${m.ar}</div>
    <div class="mr-ur">${L3(m.ur_tr, I.tr.en, I.tr.ro)}</div>
    <div class="mr-note">${L3(I.note.ur, I.note.en, I.note.ro)}</div>
    <div class="mr-ref">${L3('حوالہ','Reference','Hawala')}: ${refL3(m.ref)}</div>
  `;
}

document.getElementById('backFromMoodResult').addEventListener('click', ()=>{
  document.getElementById('moodResultWrap').style.display = 'none';
  document.getElementById('moodPickerWrap').style.display = 'block';
});

renderMoodGrid();

/* ============================================================
   NAZRA — Arabic Harf (kids' letter learning module)
   ============================================================ */
const NAZRA_LETTERS = [
  {ar:'ا', ur:'الف', roman:'Aleef', audio:'01_alif.mp3'}, {ar:'ب', ur:'بے', roman:'Baa', audio:'02_be.mp3'}, {ar:'ت', ur:'تے', roman:'Taa', audio:'03_te.mp3'}, {ar:'ث', ur:'ثے', roman:'Saa', audio:'04_se.mp3'},
  {ar:'ج', ur:'جیم', roman:'Jeeim', audio:'05_jeem.mp3'}, {ar:'ح', ur:'حے', roman:'Haa', audio:'06_bari_hay.mp3'}, {ar:'خ', ur:'خے', roman:'Khaa', audio:'07_khay.mp3'}, {ar:'د', ur:'دال', roman:'Daal', audio:'08_daal.mp3'},
  {ar:'ذ', ur:'ذال', roman:'Zaal', audio:'09_zaal.mp3'}, {ar:'ر', ur:'رے', roman:'Raa', audio:'10_re.mp3'}, {ar:'ز', ur:'زے', roman:'Zaa', audio:'11_zay.mp3'}, {ar:'س', ur:'سین', roman:'Sieen', audio:'12_seen.mp3'},
  {ar:'ش', ur:'شین', roman:'Shieen', audio:'13_sheen.mp3'}, {ar:'ص', ur:'صاد', roman:'Suad', audio:'14_suaad.mp3'}, {ar:'ض', ur:'ضاد', roman:'Zuad', audio:'15_zuaad.mp3'}, {ar:'ط', ur:'طوے', roman:'Taa', audio:'16_toy.mp3'},
  {ar:'ظ', ur:'ظوے', roman:'Zua', audio:'17_zoy.mp3'}, {ar:'ع', ur:'عین', roman:'Aieen', audio:'18_ain.mp3'}, {ar:'غ', ur:'غین', roman:'Ghaeen', audio:'19_ghain.mp3'}, {ar:'ف', ur:'فے', roman:'Faa', audio:'20_fay.mp3'},
  {ar:'ق', ur:'قاف', roman:'Qaaf', audio:'21_qaaf.mp3'}, {ar:'ك', ur:'کاف', roman:'Kaaf', audio:'22_kaaf.mp3'}, {ar:'ل', ur:'لام', roman:'Laam', audio:'23_laam.mp3'}, {ar:'م', ur:'میم', roman:'Mieem', audio:'24_meem.mp3'},
  {ar:'ن', ur:'نون', roman:'Noon', audio:'25_noon.mp3'}, {ar:'و', ur:'واؤ', roman:'Waoo', audio:'26_wao.mp3'}, {ar:'ه', ur:'چھوٹی ہے', roman:'Ha', audio:'27_choti_hay.mp3'}, {ar:'ي', ur:'یے', roman:'Yaa', audio:'28_yay.mp3'},
  {ar:'ء', ur:'ہمزہ', roman:'Hammza', audio:'29_hamza.mp3'},
];
const NAZRA_AUDIO_BASE = 'audio/nazra/';
// Letters we actually have real recordings for so far (grows as more are added)
const NAZRA_AUDIO_AVAILABLE = new Set([
  '01_alif.mp3', '02_be.mp3', '03_te.mp3', '04_se.mp3', '05_jeem.mp3', '06_bari_hay.mp3', '07_khay.mp3',
  '08_daal.mp3', '09_zaal.mp3', '10_re.mp3', '11_zay.mp3', '12_seen.mp3',
  '13_sheen.mp3', '14_suaad.mp3', '15_zuaad.mp3', '16_toy.mp3', '17_zoy.mp3',
  '18_ain.mp3', '19_ghain.mp3', '20_fay.mp3', '21_qaaf.mp3', '22_kaaf.mp3',
  '23_laam.mp3', '24_meem.mp3', '25_noon.mp3', '26_wao.mp3', '27_choti_hay.mp3', '28_yay.mp3', '29_hamza.mp3',
]);
const NAZRA_LEARNED_KEY = 'deenaasan_nazra_learned';

function getNazraLearned(){
  try{ return JSON.parse(localStorage.getItem(NAZRA_LEARNED_KEY) || '[]'); }
  catch(e){ return []; }
}
function saveNazraLearned(arr){
  try{ localStorage.setItem(NAZRA_LEARNED_KEY, JSON.stringify(arr)); }catch(e){}
}

function renderNazraGrid(){
  const learned = getNazraLearned();
  const grid = document.getElementById('nazraGrid');
  grid.innerHTML = NAZRA_LETTERS.map((l,i) => `
    <div class="nazra-tile ${learned.includes(i) ? 'learned' : ''}" data-idx="${i}">
      <div class="nz-check" data-check-idx="${i}">${learned.includes(i) ? '✓' : ''}</div>
      ${NAZRA_AUDIO_AVAILABLE.has(l.audio) ? `<div class="nz-play" data-play-idx="${i}">🔊</div>` : ''}
      <div class="nz-letter">${l.ar}</div>
      <div class="nz-name" data-ur="${l.ur}" data-roman="${l.roman}" data-en="${l.roman}">${l.ur}</div>
    </div>
  `).join('');

  grid.querySelectorAll('.nazra-tile').forEach(tile=>{
    tile.addEventListener('click', (e)=>{
      const idx = parseInt(tile.dataset.idx);
      if(e.target.closest('.nz-play')){
        const letter = NAZRA_LETTERS[idx];
        if(NAZRA_AUDIO_AVAILABLE.has(letter.audio)){
          const playBtn = e.target.closest('.nz-play');
          new Audio(NAZRA_AUDIO_BASE + letter.audio).play().catch((err)=>{
            playBtn.textContent = '⚠️';
            playBtn.title = 'Audio could not be loaded: ' + err.message;
            setTimeout(()=>{ playBtn.textContent = '🔊'; }, 2000);
          });
        }
        return;
      }
      let learned2 = getNazraLearned();
      if(learned2.includes(idx)){
        learned2 = learned2.filter(x=>x!==idx);
      } else {
        learned2.push(idx);
      }
      saveNazraLearned(learned2);
      renderNazraGrid();
    });
  });

  updateNazraProgress(learned);
  if(typeof applyLanguage === 'function') applyLanguage(localStorage.getItem('deenaasan_lang') || 'ur');
}

function updateNazraProgress(learned){
  const pct = (learned.length / NAZRA_LETTERS.length) * 100;
  document.getElementById('nazraProgressFill').style.width = pct + '%';
  document.getElementById('nazraProgressText').innerHTML = L3(`${learned.length} / ${NAZRA_LETTERS.length} حروف یاد ہو چکے`, `${learned.length} / ${NAZRA_LETTERS.length} letters learned`, `${learned.length} / ${NAZRA_LETTERS.length} huroof yaad ho chuke`);
}

/* ============================================================
   BEDTIME STORIES
   ============================================================ */
const BEDTIME_STORIES = [
  {
    emoji:'🔥', title:'حضرت ابراہیم علیہ السلام اور بت',
    text:`بہت پرانے زمانے کی بات ہے۔ حضرت ابراہیم علیہ السلام کی قوم پتھر کے بت بنا کر ان کی پوجا کرتی تھی۔ حضرت ابراہیم علیہ السلام کو یہ بات بہت عجیب لگتی — بھلا پتھر کی مورتیاں کسی کی مدد کیسے کر سکتی ہیں؟

ایک دن جب سارے لوگ میلے پر گئے ہوئے تھے، حضرت ابراہیم علیہ السلام بتخانے میں گئے اور سب سے بڑے بت کے سوا باقی سارے بت توڑ دیے۔ کلہاڑی انہوں نے بڑے بت کے کندھے پر رکھ دی۔

جب لوگ واپس آئے تو بہت غصے میں آ گئے۔ انہوں نے پوچھا: "یہ کس نے کیا؟" حضرت ابراہیم علیہ السلام نے مسکراتے ہوئے کہا: "شاید اسی بڑے بت نے کیا ہو، اسی سے پوچھ لو!"

لوگ شرمندہ ہو گئے، کیونکہ وہ جانتے تھے کہ بت بول نہیں سکتے۔ تب حضرت ابراہیم علیہ السلام نے فرمایا: پھر تم ایسی چیزوں کی پوجا کیوں کرتے ہو جو نہ بول سکیں نہ سن سکیں؟

سبق: اللہ کے سوا کوئی بھی ہماری مدد نہیں کر سکتا، اور سچائی کہنے سے کبھی نہیں ڈرنا چاہیے۔`,
    ref:"الانبیاء: ۵۱-۷۰"
  },
  {
    emoji:'🐋', title:'حضرت یونس علیہ السلام اور مچھلی',
    text:`حضرت یونس علیہ السلام اپنی قوم کو اللہ کی طرف بلاتے تھے، مگر لوگ نہیں مانے۔ وہ ناراض ہو کر ایک کشتی میں بیٹھ گئے اور اللہ سے اجازت لیے بغیر شہر چھوڑ دیا۔

سمندر میں طوفان آ گیا۔ کشتی والوں نے کہا: کسی ایک کو سمندر میں پھینکنا ہوگا ورنہ کشتی ڈوب جائے گی۔ قرعہ اندازی ہوئی تو حضرت یونس علیہ السلام کا نام نکلا، اور وہ سمندر میں کود گئے۔

اللہ تعالیٰ نے ایک بڑی مچھلی بھیجی جس نے انہیں نگل لیا، مگر اللہ کے حکم سے مچھلی نے انہیں نقصان نہ پہنچایا۔ مچھلی کے پیٹ کے اندھیرے میں حضرت یونس علیہ السلام نے دعا کی:

"لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ" (تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی ظالموں میں سے تھا)

اللہ نے ان کی دعا قبول کی اور مچھلی نے انہیں ساحل پر اگل دیا۔

سبق: جب بھی مشکل میں ہوں، اللہ سے معافی مانگیں اور صبر کریں — اللہ ضرور مدد فرماتا ہے۔`,
    ref:"الصافات: ۱۳۹-۱۴۸"
  },
  {
    emoji:'🕋', title:'اصحاب کہف — غار والے نوجوان',
    text:`بہت عرصہ پہلے کچھ نوجوان تھے جو اللہ پر ایمان لائے تھے، مگر ان کے شہر کا بادشاہ ظالم تھا اور بتوں کی پوجا کرواتا تھا۔ ان نوجوانوں نے اپنا ایمان بچانے کے لیے شہر چھوڑ دیا اور ایک غار میں پناہ لی۔

انہوں نے دعا کی: "اے ہمارے رب! ہمیں اپنی رحمت عطا فرما اور ہمارے معاملے میں درستگی پیدا کر۔"

اللہ تعالیٰ نے ان پر نیند طاری کر دی، اور وہ سینکڑوں سال تک اس غار میں سوتے رہے۔ ان کا کتا بھی غار کے دروازے پر ان کی حفاظت کرتا رہا۔

جب وہ جاگے تو انہیں لگا بس تھوڑی دیر سوئے تھے۔ ایک ساتھی کھانا لینے شہر گیا تو لوگ حیران رہ گئے — اتنے سال پرانے سکے! تب انہیں پتا چلا کہ کتنا وقت گزر چکا ہے۔

سبق: جو لوگ اپنے ایمان پر ڈٹے رہتے ہیں اور اللہ پر بھروسہ کرتے ہیں، اللہ ان کی حفاظت فرماتا ہے۔`,
    ref:"الکہف: ۹-۲۶"
  },
  {
    emoji:'⭐', title:'نبی کریم ﷺ — الامین (سچے اور امانت دار)',
    text:`نبوت سے پہلے بھی مکہ کے لوگ نبی کریم ﷺ کو "الامین" یعنی امانت دار کہتے تھے، کیونکہ آپ ﷺ کبھی جھوٹ نہیں بولتے تھے اور جو امانت رکھی جاتی، اسے صحیح سلامت واپس کرتے۔

ایک واقعہ مشہور ہے: خانہ کعبہ کی تعمیر ہو رہی تھی، اور حجرِ اسود (کالا پتھر) کو اپنی جگہ رکھنے پر جھگڑا ہو گیا — ہر قبیلہ چاہتا تھا کہ یہ اعزاز اسے ملے۔ بات اتنی بڑھ گئی کہ لڑائی کا خطرہ پیدا ہو گیا۔

تب کسی نے تجویز دی: جو بھی کل صبح سب سے پہلے آئے، فیصلہ اسی پر چھوڑ دیا جائے۔ صبح سب نے دیکھا کہ نبی کریم ﷺ آ رہے ہیں۔ سب خوش ہو گئے کیونکہ سب آپ ﷺ پر بھروسہ کرتے تھے۔

آپ ﷺ نے ایک چادر بچھائی، پتھر اس پر رکھا، اور ہر قبیلے کے سردار سے چادر کا ایک کونا پکڑوا کر سب سے مل کر پتھر کو اٹھوایا۔ پھر خود اپنے ہاتھ سے پتھر کو اس کی جگہ رکھ دیا۔ سب راضی ہو گئے اور لڑائی ٹل گئی۔

سبق: سچائی اور امانت داری سے انسان سب کا بھروسہ جیت لیتا ہے۔`,
    ref:"سیرت النبی ﷺ"
  },
  {
    emoji:'🕌', title:'حضرت بلال رضی اللہ عنہ کا صبر',
    text:`حضرت بلال رضی اللہ عنہ ایک غلام تھے جنہوں نے اسلام قبول کیا۔ ان کا مالک امیہ بن خلف اس بات پر بہت ناراض ہوا اور انہیں سخت گرمی میں تپتی ریت پر لٹا کر ان کے سینے پر بھاری پتھر رکھ دیتا، تاکہ وہ اسلام چھوڑ دیں۔

مگر حضرت بلال رضی اللہ عنہ اس تکلیف میں بھی بس ایک ہی بات کہتے رہتے: "احد، احد" (اللہ ایک ہے، اللہ ایک ہے) — وہ اپنے ایمان پر ڈٹے رہے۔

حضرت ابوبکر رضی اللہ عنہ نے یہ حال دیکھا تو انہیں خرید کر آزاد کر دیا۔ بعد میں جب مدینہ میں پہلی اذان دینے کی بات آئی، تو نبی کریم ﷺ نے حضرت بلال رضی اللہ عنہ کو یہ اعزاز بخشا — وہ اسلام کے پہلے مؤذن بنے۔

سبق: جو لوگ مشکل وقت میں بھی اپنے ایمان پر ثابت قدم رہتے ہیں، اللہ انہیں عزت سے نوازتا ہے۔`,
    ref:"سیرت الصحابہ"
  },
  {
    emoji:'🐜', title:'حضرت سلیمان علیہ السلام اور چیونٹی',
    text:`حضرت سلیمان علیہ السلام کو اللہ تعالیٰ نے خاص طاقت دی تھی — وہ پرندوں اور جانوروں کی بات سمجھ سکتے تھے، اور ان کا ایک بہت بڑا لشکر تھا جس میں انسان، جن اور پرندے شامل تھے۔

ایک دن یہ لشکر ایک وادی سے گزر رہا تھا جہاں چیونٹیاں رہتی تھیں۔ ایک چیونٹی نے باقی چیونٹیوں کو آواز دی: "اے چیونٹیو! اپنے بلوں میں چلی جاؤ، کہیں سلیمان اور ان کا لشکر انجانے میں تمہیں کچل نہ دے۔"

حضرت سلیمان علیہ السلام نے یہ بات سن لی اور مسکرا دیے۔ انہوں نے فوراً لشکر کو روک دیا تاکہ چیونٹیوں کو کوئی نقصان نہ پہنچے۔ پھر انہوں نے اللہ کا شکر ادا کیا کہ اس نے انہیں ایسی نعمتیں عطا کیں۔

سبق: اللہ کی ہر مخلوق — چاہے وہ کتنی ہی چھوٹی کیوں نہ ہو — اہم ہے، اور ہمیں سب جانداروں پر رحم کرنا چاہیے۔`,
    ref:"النمل: ۱۸-۱۹"
  },
];

function renderStoriesList(){
  const list = document.getElementById('storiesList');
  list.innerHTML = BEDTIME_STORIES.map((s,i) => {
    const I = STORIES_I18N[i];
    return `
    <div class="story-card" data-idx="${i}">
      <div class="sc-emoji">${s.emoji}</div>
      <div class="sc-text">
        <div class="sc-title">${L3(s.title, I.t.en, I.t.ro)}</div>
        <div class="sc-sub">${L3(s.ref, I.ref, I.ref)}</div>
      </div>
    </div>`;
  }).join('');
  list.querySelectorAll('.story-card').forEach(card=>{
    card.addEventListener('click', ()=> showStoryDetail(parseInt(card.dataset.idx)));
  });
}

function speakUrdu(text, btn, langCode){
  if(!('speechSynthesis' in window)){
    alert(T({ur:'یہ ڈیوائس آواز میں پڑھنے کو سپورٹ نہیں کرتی۔', en:'This device does not support text-to-speech.', roman:'Yeh device awaz mein parhne ko support nahi karti.'}));
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = langCode || 'ur-PK';
  utter.rate = 0.85;
  if(btn){
    btn.innerHTML = STOP_HTML();
    utter.onend = ()=>{ btn.innerHTML = LISTEN_HTML(); };
  }
  window.speechSynthesis.speak(utter);
}

function showStoryDetail(idx){
  const s = BEDTIME_STORIES[idx];
  const I = STORIES_I18N[idx];
  const br = t => t.replace(/\n\n/g,'<br><br>');
  document.getElementById('storiesListWrap').style.display = 'none';
  document.getElementById('storyDetailWrap').style.display = 'block';
  document.getElementById('storyDetailCard').innerHTML = `
    <div class="sd-title">${s.emoji} ${L3(s.title, I.t.en, I.t.ro)}</div>
    <button class="listen-btn" id="storyListenBtn" style="display:block;margin:0 auto 16px;">${LISTEN_HTML()}</button>
    <div class="sd-text">${L3(br(s.text), br(I.en), br(I.ro))}</div>
  `;
  document.getElementById('storyListenBtn').addEventListener('click', function(){
    const l = curLang();
    const text = (l === 'ur' ? s.text : l === 'en' ? I.en : I.ro).replace(/\n/g,' ');
    speakUrdu(text, this, l === 'ur' ? 'ur-PK' : l === 'en' ? 'en-US' : 'en-IN');
  });
}

document.getElementById('backFromStoryDetail').addEventListener('click', ()=>{
  window.speechSynthesis.cancel();
  document.getElementById('storyDetailWrap').style.display = 'none';
  document.getElementById('storiesListWrap').style.display = 'block';
});

renderStoriesList();

/* ============================================================
   DEEN STREAK
   ============================================================ */
const STREAK_DATES_KEY = 'deenaasan_streak_dates'; // array of 'YYYY-MM-DD'
const STREAK_BEST_KEY = 'deenaasan_streak_best';

function todayStr(){
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function dateStrDaysAgo(n){
  const d = new Date();
  d.setDate(d.getDate()-n);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function getStreakDates(){
  try{ return JSON.parse(localStorage.getItem(STREAK_DATES_KEY) || '[]'); }
  catch(e){ return []; }
}
function saveStreakDates(arr){
  try{ localStorage.setItem(STREAK_DATES_KEY, JSON.stringify(arr)); }catch(e){}
}
function computeCurrentStreak(dates){
  const set = new Set(dates);
  let streak = 0;
  let offset = 0;
  if(set.has(todayStr())){
    streak = 1;
    offset = 1;
    while(set.has(dateStrDaysAgo(offset))){ streak++; offset++; }
  } else if(set.has(dateStrDaysAgo(1))){
    streak = 1;
    offset = 2;
    while(set.has(dateStrDaysAgo(offset))){ streak++; offset++; }
  }
  return streak;
}

function renderStreak(){
  const dates = getStreakDates();
  const current = computeCurrentStreak(dates);
  let best = parseInt(localStorage.getItem(STREAK_BEST_KEY) || '0');
  if(current > best){
    best = current;
    try{ localStorage.setItem(STREAK_BEST_KEY, String(best)); }catch(e){}
  }
  document.getElementById('streakNum').textContent = current;
  document.getElementById('streakBest').innerHTML = L3(`بہترین تسلسل: ${best} دن`, `Best streak: ${best} days`, `Behtareen tasalsul: ${best} din`);

  const set = new Set(dates);
  let weekHtml = '';
  for(let i=6;i>=0;i--){
    const ds = dateStrDaysAgo(i);
    const d = new Date();
    d.setDate(d.getDate()-i);
    const isDone = set.has(ds);
    weekHtml += `<div class="streak-day ${isDone?'done':''}">${isDone?'✓':d.getDate()}</div>`;
  }
  document.getElementById('streakWeek').innerHTML = weekHtml;

  const markBtn = document.getElementById('markTodayBtn');
  if(set.has(todayStr())){
    markBtn.innerHTML = L3('✓ آج مکمل ہو چکا','✓ Done for today','✓ Aaj mukammal ho chuka');
    markBtn.disabled = true;
  } else {
    markBtn.innerHTML = L3('آج کا عمل مکمل — نشان لگائیں','Mark today as done','Aaj ka amal mukammal — nishan lagayein');
    markBtn.disabled = false;
  }
}

document.getElementById('markTodayBtn').addEventListener('click', ()=>{
  const dates = getStreakDates();
  const t = todayStr();
  if(!dates.includes(t)){
    dates.push(t);
    saveStreakDates(dates);
  }
  renderStreak();
});

/* ============================================================
   PARENT DASHBOARD
   ============================================================ */
function renderParentDashboard(){
  const qazaCounts = getQazaCounts();
  const qazaTotal = QAZA_PRAYERS.reduce((sum,p)=> sum + (qazaCounts[p.key]||0), 0);

  let tasbeehTotal = 0;
  getAddedTasbeehIds().forEach(id => { tasbeehTotal += getTasbeehCount(id); });

  const nazraLearned = getNazraLearned().length;
  const currentStreak = computeCurrentStreak(getStreakDates());

  document.getElementById('parentGrid').innerHTML = `
    <div class="parent-card">
      <div class="pc-icon">🔤</div>
      <div class="pc-num">${nazraLearned}/${NAZRA_LETTERS.length}</div>
      <div class="pc-label">${L3('حروف سیکھے','Letters learned','Huroof seekhe')}</div>
    </div>
    <div class="parent-card">
      <div class="pc-icon">📿</div>
      <div class="pc-num">${tasbeehTotal}</div>
      <div class="pc-label">${L3('کل تسبیح','Total tasbeeh','Kul tasbeeh')}</div>
    </div>
    <div class="parent-card">
      <div class="pc-icon">⏰</div>
      <div class="pc-num">${qazaTotal}</div>
      <div class="pc-label">${L3('باقی قضا نمازیں','Qaza prayers remaining','Baqi qaza namazein')}</div>
    </div>
    <div class="parent-card">
      <div class="pc-icon">🔥</div>
      <div class="pc-num">${currentStreak}</div>
      <div class="pc-label">${L3('دن کا تسلسل','Day streak','Din ka tasalsul')}</div>
    </div>
  `;
}

/* ============================================================
   CHARITY DIRECTORY (verified, well-known Pakistani charities)
   ============================================================ */
const CHARITIES = [
  {
    name:"Edhi Foundation", tag:"Emergency, Orphan Care, Shelter",
    desc:"Pakistan ki sab se purani aur bari fallahi tanzeem — ambulance, orphanage, old-age homes, aur emergency relief 1951 se faragh dilana rahi hai۔",
    url:"https://www.edhi.org"
  },
  {
    name:"Al-Khidmat Foundation", tag:"Disaster Relief, Health, Education",
    desc:"Aafat-zada ilaqon mein rahat kaam, sehat, taleem, aur yateemon ki dekhbhal — mulk bhar mein sargarm hai۔",
    url:"https://alkhidmat.org"
  },
  {
    name:"Saylani Welfare Trust", tag:"Food, Education, Healthcare",
    desc:"Rozana hazaron logon ko khana, sehat, aur taleemi sahulat faraham karta hai — dastarkhwan aur mass-training programs mashhoor hain۔",
    url:"https://saylaniwelfare.com"
  },
  {
    name:"Chhipa Welfare Association", tag:"Ambulance, Rescue, Dastarkhwan",
    desc:"Karachi mein ambulance aur rescue khidmaat, saath hi rozana hazaron logon ko khana bhi faraham karta hai۔",
    url:"https://www.chhipa.org"
  },
  {
    name:"Akhuwat Foundation", tag:"Interest-Free Loans, Education",
    desc:"Bila-sood (bina interest) qarze deta hai taake log apna chhota kaam shuru kar saken — gharibi khatam karne ka mustanad tareeqa۔",
    url:"https://akhuwat.org.pk"
  },
  {
    name:"Shaukat Khanum Memorial Cancer Hospital", tag:"Free Cancer Treatment",
    desc:"75% se zyada mareezon ka cancer ka ilaj muft karta hai, iski adaigi ki salahiyat na ho to bhi۔",
    url:"https://shaukatkhanum.org.pk"
  },
  {
    name:"Indus Hospital & Health Network", tag:"Free Healthcare",
    desc:"Har saal lakhon mareezon ko bilkul muft, معیاری healthcare faraham karta hai۔",
    url:"https://indushospital.org.pk"
  },
];

function renderCharityList(){
  const list = document.getElementById('charityList');
  list.innerHTML = CHARITIES.map((c,i) => {
    const I = CHARITY_I18N[i];
    return `
    <div class="charity-card">
      <div class="ch-name">${c.name}</div>
      <span class="ch-tag">${c.tag}</span>
      <div class="ch-desc">${L3(I.ur, I.en, I.ro)}</div>
      <a class="ch-link" href="${c.url}" target="_blank" rel="noopener noreferrer">${L3('ویب سائٹ کھولیں →','Open website →','Website kholein →')}</a>
    </div>`;
  }).join('');
}

/* ============================================================
   KALIMAY — The Six Kalimas
   ============================================================ */
const KALIMAY = [
  {
    title:"پہلا کلمہ — کلمہ طیبہ",
    ar:"لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ",
    ur_tr:"اللہ کے سوا کوئی معبود نہیں، محمد ﷺ اللہ کے رسول ہیں۔"
  },
  {
    title:"دوسرا کلمہ — کلمہ شہادت",
    ar:"أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    ur_tr:"میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں، اور میں گواہی دیتا ہوں کہ محمد ﷺ اس کے بندے اور اس کے رسول ہیں۔"
  },
  {
    title:"تیسرا کلمہ — کلمہ تمجید",
    ar:"سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    ur_tr:"اللہ پاک ہے، اور سب تعریفیں اللہ کے لیے ہیں، اور اللہ کے سوا کوئی معبود نہیں، اور اللہ سب سے بڑا ہے، اور نیکی کی توفیق اور گناہ سے بچنے کی طاقت اللہ ہی کی مدد سے ہے جو بلند و بزرگ ہے۔"
  },
  {
    title:"چوتھا کلمہ — کلمہ توحید",
    ar:"لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ أَبَدًا أَبَدًا ذُو الْجَلَالِ وَالْإِكْرَامِ بِيَدِهِ الْخَيْرُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    ur_tr:"اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں، بادشاہی اسی کی ہے اور تعریف بھی اسی کے لیے ہے، وہی زندہ کرتا اور مارتا ہے، اور وہ ہمیشہ زندہ ہے کبھی نہیں مرے گا، بزرگی اور عزت والا ہے، بھلائی اسی کے ہاتھ میں ہے، اور وہ ہر چیز پر قادر ہے۔"
  },
  {
    title:"پانچواں کلمہ — کلمہ استغفار",
    ar:"أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمْدًا أَوْ خَطَأً سِرًّا أَوْ عَلَانِيَةً وَأَتُوبُ إِلَيْهِ مِنَ الذَّنْبِ الَّذِي أَعْلَمُ وَمِنَ الذَّنْبِ الَّذِي لَا أَعْلَمُ إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ وَسَتَّارُ الْعُيُوبِ وَغَفَّارُ الذُّنُوبِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    ur_tr:"میں اپنے رب اللہ سے ہر اس گناہ کی بخشش مانگتا ہوں جو مجھ سے جان بوجھ کر یا بھول کر، چھپ کر یا ظاہر میں ہوا، اور میں اس گناہ سے بھی توبہ کرتا ہوں جسے میں جانتا ہوں اور جسے نہیں جانتا۔ بے شک تو ہی غیب کی باتیں جاننے والا، عیبوں کو چھپانے والا اور گناہوں کو بخشنے والا ہے، اور نیکی کی توفیق اللہ ہی کی مدد سے ملتی ہے جو بلند و بزرگ ہے۔"
  },
  {
    title:"چھٹا کلمہ — کلمہ رد کفر",
    ar:"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ أَنْ أُشْرِكَ بِكَ شَيْئًا وَأَنَا أَعْلَمُ بِهِ وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ بِهِ تُبْتُ عَنْهُ وَتَبَرَّأْتُ مِنَ الْكُفْرِ وَالشِّرْكِ وَالْكِذْبِ وَالْغِيبَةِ وَالْبِدْعَةِ وَالنَّمِيمَةِ وَالْفَوَاحِشِ وَالْبُهْتَانِ وَالْمَعَاصِي كُلِّهَا وَأَسْلَمْتُ وَأَقُولُ لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ",
    ur_tr:"اے اللہ! میں اس بات سے تیری پناہ مانگتا ہوں کہ جان بوجھ کر تیرے ساتھ کسی کو شریک ٹھہراؤں، اور جو مجھے معلوم نہیں اس کے لیے بھی تجھ سے بخشش مانگتا ہوں۔ میں نے اس سے توبہ کی اور کفر، شرک، جھوٹ، غیبت، بدعت، چغلی، بے حیائی، بہتان اور تمام گناہوں سے بیزاری کا اظہار کیا، اور میں اسلام لایا اور کہتا ہوں: اللہ کے سوا کوئی معبود نہیں، محمد ﷺ اللہ کے رسول ہیں۔"
  },
];

function renderKalimayList(){
  const list = document.getElementById('kalimayList');
  list.innerHTML = KALIMAY.map((k,i) => {
    const I = KALIMA_I18N[i];
    return `
    <div class="kalima-card">
      <div class="kc-title">${L3(k.title, I.t.en, I.t.ro)}</div>
      <div class="kc-ar">${k.ar}</div>
      <button class="listen-btn" data-listen-idx="${i}" data-listen-source="kalima">${LISTEN_HTML()}</button>
      <div class="kc-ur">${L3(k.ur_tr, I.tr.en, I.tr.ro)}</div>
    </div>`;
  }).join('');
}

/* ============================================================
   ASMA-UL-HUSNA — full browsable list
   ============================================================ */
function asmaNameOnly(a){ return a.en.split(' — ')[0]; }
function renderAsmaFullList(){
  const list = document.getElementById('asmaFullList');
  list.innerHTML = ASMA_UL_HUSNA.map((a,i) => `
    <div class="asma-item">
      <div class="ai-num">${i+1}</div>
      <div class="ai-ar">${a.ar}</div>
      <div class="ai-en">${L3(asmaNameOnly(a), a.en, asmaNameOnly(a))}</div>
      <div class="ai-ur">${L3(a.ur, '', ASMA_RO[i])}</div>
    </div>
  `).join('');
}

/* ============================================================
   RAMADAN — Sehri & Iftar
   ============================================================ */
const RAMADAN_TXT = {
  needBoth: {ur:'براہِ کرم شہر اور ملک دونوں لکھیں۔', en:'Please enter both a city and a country.', roman:'Meherbani karke shehar aur mulk dono likhein.'},
  failed:   {ur:'وقت معلوم نہیں ہو سکا۔ شہر/ملک کی اسپیلنگ چیک کریں اور دوبارہ کوشش کریں۔', en:'Could not get the timings. Please check the spelling of the city/country and try again.', roman:'Waqt maloom nahi ho saka. Shehar/mulk ki spelling check karein aur dobara koshish karein.'},
  sehri:    {ur:'سحری ختم', en:'Sehri ends', roman:'Sehri khatam'},
  iftar:    {ur:'افطار', en:'Iftar', roman:'Iftar'},
  note:     {ur:'احتیاط کے طور پر سحری ختم ہونے سے کم از کم 10 منٹ پہلے کھانا پینا بند کر دینا بہتر ہے۔', en:'As a precaution, it is better to stop eating and drinking at least 10 minutes before Sehri ends.', roman:'Ehtiyaat ke taur par sehri khatam hone se kam az kam 10 minute pehle khana peena band kar dena behtar hai.'}
};
window.lastRamadan = null;

document.getElementById('getRamadanBtn').addEventListener('click', async ()=>{
  const city = document.getElementById('ramadanCityInput').value.trim();
  const country = document.getElementById('ramadanCountryInput').value.trim();
  const resultBox = document.getElementById('ramadanResult');
  if(!city || !country){
    window.lastRamadan = {error:'needBoth'};
    renderRamadanResult();
    return;
  }
  resultBox.innerHTML = `<div class="loading">${T(HIJRI_TXT.loading)}</div>`;
  try{
    const school = localStorage.getItem('deenaasan_fiqh') || '0';
    const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2&school=${school}`);
    const json = await res.json();
    if(json.code !== 200) throw new Error('bad response');
    const t = json.data.timings;
    const hj = json.data.date.hijri;
    window.lastRamadan = {
      city, country,
      dateInfo: json.data.date.readable,
      hijri: hj ? `${hj.day} ${hj.month.en} ${hj.year} AH` : '',
      fajr: t.Fajr, maghrib: t.Maghrib
    };
  }catch(err){
    window.lastRamadan = {error:'failed'};
  }
  renderRamadanResult();
});

function renderRamadanResult(){
  const box = document.getElementById('ramadanResult');
  const r = window.lastRamadan;
  if(!r){ box.innerHTML = ''; return; }
  if(r.error){
    box.innerHTML = `<div class="error-box">${T(RAMADAN_TXT[r.error])}</div>`;
    return;
  }
  box.innerHTML = `
    <div class="ramadan-card">
      <div class="rc-date">📍 ${r.city}, ${r.country} &middot; ${r.dateInfo}${r.hijri ? ' — ' + r.hijri : ''}</div>
      <div class="ramadan-times-grid">
        <div class="ramadan-time-box">
          <div class="rt-label">${T(RAMADAN_TXT.sehri)}</div>
          <div class="rt-sub">(Fajr)</div>
          <div class="rt-time">${r.fajr}</div>
        </div>
        <div class="ramadan-time-box">
          <div class="rt-label">${T(RAMADAN_TXT.iftar)}</div>
          <div class="rt-sub">(Maghrib)</div>
          <div class="rt-time">${r.maghrib}</div>
        </div>
      </div>
    </div>
    <p class="hint" style="text-align:center;margin-top:14px;">${T(RAMADAN_TXT.note)}</p>
  `;
}

/* ============================================================
   WUDU & NAMAZ GUIDE
   ============================================================ */
const GUIDE_TOPICS = [
  {
    id:'wudu', emoji:'💧', title:'Wudu ka Tareeqa', sub:'وضو کا طریقہ',
    steps:[
      {title:'نیت اور بسم اللہ', ur:'دل میں وضو کی نیت کریں اور «بِسْمِ اللّٰہِ» کہہ کر شروع کریں۔', en:'Make the intention (niyyah) for wudu in your heart, and begin by saying "Bismillah".'},
      {title:'ہاتھ دھوئیں', ur:'دونوں ہاتھ گٹوں تک تین بار دھوئیں، انگلیوں کے درمیان بھی خلال کریں۔', en:'Wash both hands up to the wrists three times, making sure water reaches between the fingers.'},
      {title:'کلی کریں', ur:'تین بار منہ میں پانی ڈال کر کلی کریں۔', en:'Rinse your mouth with water three times.'},
      {title:'ناک میں پانی', ur:'تین بار ناک میں پانی چڑھا کر صاف کریں۔', en:'Sniff water into the nose and clean it out, three times.'},
      {title:'چہرہ دھوئیں', ur:'پیشانی کے بالوں سے ٹھوڑی تک، اور ایک کان سے دوسرے کان تک، پورا چہرہ تین بار دھوئیں۔', en:'Wash the entire face three times, from the hairline to the chin, and from ear to ear.'},
      {title:'بازو دھوئیں', ur:'دونوں بازو کہنیوں سمیت تین تین بار دھوئیں — پہلے دایاں پھر بایاں۔', en:'Wash both arms including the elbows, three times each — right arm first, then left.'},
      {title:'سر کا مسح', ur:'گیلے ہاتھوں سے ایک بار پورے سر پر ہاتھ پھیریں (مسح کریں)۔', en:'Wipe your wet hands over the entire head once (mash).'},
      {title:'کانوں کا مسح', ur:'انگلیوں سے کانوں کے اندر اور باہر کا مسح کریں۔', en:'Wipe the inside and outside of both ears with wet fingers.'},
      {title:'پاؤں دھوئیں', ur:'دونوں پاؤں، ٹخنوں سمیت، تین تین بار دھوئیں — پہلے دایاں پھر بایاں۔ انگلیوں کے درمیان خلال کرنا نہ بھولیں۔', en:'Wash both feet including the ankles, three times each — right foot first, then left. Don\'t forget to run water between the toes.'},
    ]
  },
  {
    id:'namaz', emoji:'🕌', title:'Namaz ka Tareeqa (2 Rakat)', sub:'نماز کا طریقہ',
    steps:[
      {title:'نیت اور تکبیرِ تحریمہ', ur:'قبلہ کی طرف رخ کر کے دل میں نیت کریں، پھر دونوں ہاتھ کانوں تک اٹھا کر «اللہ اکبر» کہیں اور ہاتھ باندھ لیں۔', en:'Face the Qibla and make the intention in your heart, then raise both hands to your ears saying "Allahu Akbar" and fold your hands.'},
      {title:'ثنا، تعوذ، تسمیہ', ur:'«سُبْحَانَکَ اللّٰہُمَّ...» (ثنا) پڑھیں، پھر «أَعُوذُ بِاللّٰہِ...» اور «بِسْمِ اللّٰہِ...» کہیں۔', en:'Recite the opening supplication (Sana), then seek refuge (Ta\'awwuz) and say "Bismillah" (Tasmiyah).'},
      {title:'سورۃ فاتحہ اور سورت', ur:'سورۃ الفاتحہ پڑھیں، پھر کوئی بھی چھوٹی سورت (جیسے الاخلاص) ملائیں۔', en:'Recite Surah Al-Fatiha, then add any short surah (such as Al-Ikhlas).'},
      {title:'رکوع', ur:'«اللہ اکبر» کہتے ہوئے جھک کر رکوع کریں، ہاتھ گھٹنوں پر رکھیں، «سُبْحَانَ رَبِّیَ الْعَظِیمْ» تین بار کہیں۔', en:'Bow down for ruku while saying "Allahu Akbar", place your hands on your knees, and say "Subhana Rabbiyal Azeem" three times.'},
      {title:'قومہ (سیدھا کھڑا ہونا)', ur:'«سَمِعَ اللّٰہُ لِمَنْ حَمِدَہ» کہتے ہوئے سیدھے کھڑے ہوں، پھر «رَبَّنَا لَکَ الْحَمْد» کہیں۔', en:'Stand up straight saying "Sami\'Allahu liman hamidah", then say "Rabbana lakal hamd".'},
      {title:'سجدہ', ur:'«اللہ اکبر» کہتے ہوئے سجدے میں جائیں، «سُبْحَانَ رَبِّیَ الْاَعْلٰی» تین بار کہیں۔', en:'Go into prostration (sajdah) saying "Allahu Akbar", and say "Subhana Rabbiyal A\'la" three times.'},
      {title:'جلسہ (دو سجدوں کے درمیان بیٹھنا)', ur:'تھوڑی دیر بیٹھ کر پھر دوسرا سجدہ کریں۔ یہ ایک رکعت مکمل ہوئی۔', en:'Sit briefly, then perform the second prostration. This completes one rak\'ah.'},
      {title:'دوسری رکعت', ur:'کھڑے ہو کر دوسری رکعت میں بھی وہی ترتیب دہرائیں (فاتحہ + سورت + رکوع + سجدے)۔', en:'Stand up and repeat the same sequence for the second rak\'ah (Fatiha + Surah + Ruku + Sajdahs).'},
      {title:'تشہد (قعدہ)', ur:'دو رکعتوں کے بعد بیٹھ کر «اَلتَّحِیَّاتُ...» پڑھیں۔ اگر دو رکعت والی نماز ہے تو اسی بیٹھک میں درود اور دعا بھی پڑھ کر سلام پھیر دیں۔', en:'After two rak\'ahs, sit and recite "At-Tahiyyat". If it is a two-rak\'ah prayer, also recite Durood and the closing dua in this same sitting, then finish with salam.'},
      {title:'سلام', ur:'دائیں طرف «اَلسَّلَامُ عَلَیْکُمْ وَرَحْمَۃُ اللّٰہِ» کہتے ہوئے چہرہ پھیریں، پھر بائیں طرف بھی۔ نماز مکمل ہو گئی۔', en:'Turn your face to the right saying "Assalamu alaikum wa rahmatullah", then to the left. The prayer is now complete.'},
    ]
  },
];

function renderGuideTopics(){
  const wrap = document.getElementById('guideTopics');
  wrap.innerHTML = GUIDE_TOPICS.map(t => {
    const I = GUIDE_I18N.topics[t.id];
    return `
    <div class="guide-topic-card" data-id="${t.id}">
      <div class="gt-emoji">${t.emoji}</div>
      <div class="gt-text">
        <div class="gt-title">${L3(t.sub, I.title.en, I.title.ro)}</div>
      </div>
    </div>`;
  }).join('');
  wrap.querySelectorAll('.guide-topic-card').forEach(card=>{
    card.addEventListener('click', ()=> showGuideDetail(card.dataset.id));
  });
}

function showGuideDetail(id){
  const topic = GUIDE_TOPICS.find(t=>t.id===id);
  if(!topic) return;
  const TI = GUIDE_I18N.topics[id];
  const SI = GUIDE_I18N.steps[id];
  document.getElementById('guideListWrap').style.display = 'none';
  document.getElementById('guideDetailWrap').style.display = 'block';
  document.getElementById('guideDetailCard').innerHTML = `
    <div class="section-head">
      <h2>${L3(topic.sub, TI.title.en, TI.title.ro)}</h2>
    </div>
    ${topic.steps.map((s,i) => `
      <div class="guide-step">
        <div class="gs-num">${i+1}</div>
        <div>
          <div class="gs-title">${L3(s.title, SI[i].t.en, SI[i].t.ro)}</div>
          <div class="gs-ur">${L3(s.ur, s.en, SI[i].d)}</div>
        </div>
      </div>
    `).join('')}
  `;
}

document.getElementById('backFromGuideDetail').addEventListener('click', ()=>{
  document.getElementById('guideDetailWrap').style.display = 'none';
  document.getElementById('guideListWrap').style.display = 'block';
});

/* ============================================================
   FAVORITES (bookmarked duas)
   ============================================================ */
function duaCardHtml(d, i, extraClass){
  const I = DUA_I18N[i] || {t:d.en, tr:d.en_tr};
  const favActive = getFavoriteDuaIds().includes(i) ? 'active' : '';
  return `
  <div class="dua-card ${extraClass || ''}" data-idx="${i}">
    <div class="dua-head">
      <div class="dua-titles"><div class="en">${L3(d.ur, d.en, I.t)}</div></div>
      <button class="fav-btn ${favActive}" data-fav-idx="${i}">⭐</button>
      <div class="dua-chevron">▾</div>
    </div>
    <div class="dua-body">
      <div class="dua-ar">${d.ar}</div>
      <button class="listen-btn" data-listen-idx="${i}" data-listen-source="dua">${LISTEN_HTML()}</button>
      <div class="dua-translit">${d.translit}</div>
      <div class="dua-tr">${L3(d.ur_tr, d.en_tr, I.tr)}</div>
      ${d.ref ? `<div class="dua-ref">${L3('حوالہ','Reference','Hawala')}: ${refL3(d.ref)}</div>` : ''}
    </div>
  </div>`;
}

function renderFavoritesList(){
  const ids = getFavoriteDuaIds();
  const wrap = document.getElementById('favoritesList');
  if(ids.length === 0){
    wrap.innerHTML = `<p class="hint">${L3('ابھی کوئی پسندیدہ دعا نہیں ہے۔','No favourite duas yet.','Abhi koi pasandeeda dua nahi hai.')}</p>`;
    return;
  }
  wrap.innerHTML = ids.filter(i => DUAS[i]).map(i => duaCardHtml(DUAS[i], i, 'open')).join('');
  wrap.querySelectorAll('.dua-card').forEach(card=>{
    card.querySelector('.dua-head').addEventListener('click', (e)=>{
      if(e.target.closest('.fav-btn')) return;
      card.classList.toggle('open');
    });
  });
  wrap.querySelectorAll('.fav-btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      toggleFavoriteDua(parseInt(btn.dataset.favIdx));
      renderFavoritesList();
    });
  });
}

/* ============================================================
   SETTINGS — Dark Mode, Font Size, Notifications, Fiqh
   ============================================================ */
const DARK_MODE_KEY = 'deenaasan_dark_mode';
const FONT_SIZE_KEY = 'deenaasan_font_size';
const FIQH_KEY = 'deenaasan_fiqh';

function applyDarkMode(on){
  document.body.classList.toggle('dark-mode', on);
  try{ localStorage.setItem(DARK_MODE_KEY, on ? '1' : '0'); }catch(e){}
}
function applyFontSize(size){
  document.body.classList.remove('font-small','font-medium','font-large');
  document.body.classList.add('font-'+size);
  try{ localStorage.setItem(FONT_SIZE_KEY, size); }catch(e){}
}

function initSettingsView(){
  const darkOn = localStorage.getItem(DARK_MODE_KEY) === '1';
  document.getElementById('darkModeToggle').checked = darkOn;

  const currentFont = localStorage.getItem(FONT_SIZE_KEY) || 'medium';
  document.querySelectorAll('.fs-btn[data-size]').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.size === currentFont);
  });

  const currentFiqh = localStorage.getItem(FIQH_KEY) || '0';
  document.getElementById('globalFiqhSelect').value = currentFiqh;
}

document.getElementById('darkModeToggle').addEventListener('change', (e)=>{
  applyDarkMode(e.target.checked);
});
document.querySelectorAll('.fs-btn[data-size]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.fs-btn[data-size]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    applyFontSize(btn.dataset.size);
  });
});
document.getElementById('globalFiqhSelect').addEventListener('change', (e)=>{
  try{ localStorage.setItem(FIQH_KEY, e.target.value); }catch(err){}
});

// Apply saved preferences on load
(function applySavedPreferences(){
  if(localStorage.getItem(DARK_MODE_KEY) === '1') document.body.classList.add('dark-mode');
  const savedFont = localStorage.getItem(FONT_SIZE_KEY) || 'medium';
  document.body.classList.add('font-'+savedFont);
})();

// Azan notifications (best-effort, works while app is open/backgrounded)
let scheduledNotifTimeouts = [];
function scheduleNotificationsForToday(timings){
  scheduledNotifTimeouts.forEach(t=>clearTimeout(t));
  scheduledNotifTimeouts = [];
  const now = new Date();
  PRAYER_LABELS.forEach(p=>{
    const timeStr = timings[p.key];
    if(!timeStr) return;
    const [h,m] = timeStr.split(':').map(Number);
    const target = new Date();
    target.setHours(h, m, 0, 0);
    const msUntil = target - now;
    if(msUntil > 0 && msUntil < 24*60*60*1000){
      const timeoutId = setTimeout(()=>{
        if(Notification.permission === 'granted'){
          new Notification(T({ur:'نماز کا وقت — ' + p.ur, en:'Prayer time — ' + p.en, roman:'Namaz ka waqt — ' + p.en}), {
            body: T({ur:`${p.ur} کی نماز کا وقت ہو گیا ہے۔`, en:`It is time for ${p.en} prayer.`, roman:`${p.en} ki namaz ka waqt ho gaya hai.`}),
            icon: 'icon-192.png'
          });
        }
      }, msUntil);
      scheduledNotifTimeouts.push(timeoutId);
    }
  });
}

document.getElementById('enableNotifBtn').addEventListener('click', async ()=>{
  const btn = document.getElementById('enableNotifBtn');
  if(!('Notification' in window)){
    alert(T({ur:'یہ ڈیوائس اطلاعات کو سپورٹ نہیں کرتی۔', en:'This device does not support notifications.', roman:'Yeh device notifications support nahi karti.'}));
    return;
  }
  const perm = await Notification.requestPermission();
  if(perm === 'granted'){
    btn.dataset.i18nUr = '✓ اطلاعات آن ہیں'; btn.dataset.i18nEn = '✓ Notifications are on'; btn.dataset.i18nRoman = '✓ Notifications on hain'; btn.textContent = T({ur:btn.dataset.i18nUr, en:btn.dataset.i18nEn, roman:btn.dataset.i18nRoman});
    btn.disabled = true;
    try{ localStorage.setItem('deenaasan_notif_enabled', '1'); }catch(e){}
    if(window.lastFetchedTimings) scheduleNotificationsForToday(window.lastFetchedTimings);
  } else {
    alert(T({ur:'اطلاعات کی اجازت نہیں ملی۔ فون کی سیٹنگز میں جا کر اجازت دیں۔', en:'Notification permission was not granted. Please allow it in your phone settings.', roman:'Notification ki ijazat nahi mili. Phone ki settings mein ja kar allow karein.'}));
  }
});

/* ============================================================
   ABOUT & PRIVACY POLICY
   ============================================================ */
function renderAboutContent(){
  document.getElementById('aboutContent').innerHTML = `
    <h3>About Deen Aasan</h3>
    <p>Deen Aasan brings the Quran, prayer times, daily duas and everyday Islamic tools together in one app, with Urdu and English support. Version 1.0.</p>

    <h3>Data Sources and Credits</h3>
    <p>Quran text and translations: AlQuran Cloud API and the open Quran API project (fawazahmed0). Recitation audio: Islamic Network CDN (Mishary Alafasy, Abdul Basit, Al-Husary, As-Sudais). Prayer times and Hijri dates: Al-Adhan API. Arabic font: Uthman Taha Naskh (King Fahd Complex, Madinah). The Nazra letter pronunciations were recorded by the app developer.</p>

    <h3>Privacy Policy</h3>
    <p><b>Location.</b> The app asks for your location only when you tap “My Location” (prayer times) or “Find Qibla”. Your coordinates are used on your device to calculate the Qibla direction and are sent to the Al-Adhan API only to fetch prayer times. We do not store, track or build any history of your location.</p>
    <p><b>Data stored on your device.</b> Tasbeeh counts, Qaza counts, favourites, streaks, learning progress and settings (language, theme, font size) are saved only on your device. They are not uploaded to any server.</p>
    <p><b>Community features.</b> If you use “Local Masjid Times” or “Group Khatm Tracker”, the information you submit (masjid name, area, prayer times, group name and Para progress) is stored in Google Firebase and is visible to other users of the app. Please do not enter personal or sensitive information. Entries cannot be edited or deleted from inside the app; contact the developer if you would like something removed.</p>
    <p><b>Third-party services.</b> To work, the app requests data from AlQuran Cloud, the Quran API (served through GitHub/jsDelivr), Islamic Network, Al-Adhan, Google Fonts and Google Firebase. These services can see your IP address as part of normal internet requests and are governed by their own privacy policies.</p>
    <p><b>Advertising and analytics.</b> At present the app contains no advertising and no third-party analytics or tracking. If advertising or any other form of monetisation is added in the future, this policy will be updated and the change will be clearly stated.</p>
    <p><b>Children.</b> The Nazra (Arabic letters) section is suitable for children. The app does not ask for or collect a child’s name, photo or any personal information.</p>
    <p><b>Contact.</b> For questions, corrections or removal requests, please contact the developer through the app’s Google Play listing.</p>

    <h3>Disclaimer</h3>
    <p>Deen Aasan is made for all Muslims and does not belong to any particular school of thought. Where rulings differ (for example the Asr time), you can choose the method you follow in Settings. The Zakat calculator provides an estimate only; please consult a qualified scholar or mufti before making a final decision.</p>
  `;
}

/* ============================================================
   LANGUAGE SWITCHER — Urdu / English / Roman Urdu
   Only elements tagged with data-ur + data-roman are affected.
   Arabic text (Quran, dua Arabic, Kalima Arabic) has no such
   attributes, so it is NEVER changed by this system.
   ============================================================ */
const LANG_KEY = 'deenaasan_lang';

function curLang(){
  if(document.body.classList.contains('lang-roman')) return 'roman';
  if(document.body.classList.contains('lang-en')) return 'en';
  return 'ur';
}
function T(o){ return o[curLang()] || o.en; }

function sameAsEnglish(el){
  // Find the English label that sits right before this element
  let node = el.previousSibling;
  while(node && node.nodeType === 3 && !node.textContent.trim()) node = node.previousSibling;
  if(!node) return false;
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const ref = norm(node.textContent || '');
  return ref !== '' && ref === norm(el.dataset.roman || '');
}

function applyLanguage(lang){
  if(!['ur','en','roman'].includes(lang)) lang = 'ur';
  document.body.classList.remove('lang-ur','lang-en','lang-roman');
  document.body.classList.add('lang-' + lang);

  document.querySelectorAll('[data-ur][data-roman]').forEach(el=>{
    if(lang === 'ur'){
      el.textContent = el.dataset.ur;
      el.style.display = '';
    } else if(lang === 'roman'){
      el.textContent = el.dataset.roman;
      // Hide the Roman line when it would just repeat the English label next to it
      el.style.display = sameAsEnglish(el) ? 'none' : '';
    } else if(el.dataset.en){
      el.textContent = el.dataset.en;
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });

  const i18nKey = {ur:'i18nUr', en:'i18nEn', roman:'i18nRoman'}[lang];
  document.querySelectorAll('[data-i18n-ur]').forEach(el=>{
    if(el.dataset[i18nKey] !== undefined) el.textContent = el.dataset[i18nKey];
  });

  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Re-render views whose text is generated in JavaScript
  if(typeof renderQazaList === 'function') renderQazaList();
  if(typeof renderZakatResult === 'function') renderZakatResult();
  if(typeof renderQiblaTexts === 'function') renderQiblaTexts();
  if(typeof renderRamadanResult === 'function') renderRamadanResult();
  if(window.lastHijriDays && typeof renderHijriCalendar === 'function') renderHijriCalendar(window.lastHijriDays);

  try{ localStorage.setItem(LANG_KEY, lang); }catch(e){}
}

document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> applyLanguage(btn.dataset.lang));
});

applyLanguage(localStorage.getItem(LANG_KEY) || 'ur');

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  });
}
