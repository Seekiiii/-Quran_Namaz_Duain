/* ============================================================
   i18n-data.js — translations (English + Roman Urdu) for content
   whose Urdu text already lives in app.js. Loaded BEFORE app.js.
   Arabic text is never translated or changed.
   ============================================================ */

/* Renders three language variants side by side; CSS shows only the active one. */
function L3(ur, en, ro){
  return `<span class="t-ur">${ur}</span><span class="t-en">${en}</span><span class="t-ro">${ro}</span>`;
}

/* ---------- References (hadith / surah) shown in English & Roman ---------- */
const REF_MAP = [
  ['مستدرک حاکم', `Mustadrak al-Hakim`], ['مجمع الزوائد', `Majma az-Zawa'id`],
  ['عمل الیوم واللیلۃ لابن السنی', `Amal al-Yawm wal-Laylah (Ibn as-Sunni)`], ['الاذکار للنووی', `Al-Adhkar (Nawawi)`],
  ['ابن ماجہ', `Ibn Majah`], ['ابوداود', `Abu Dawud`], ['بخاری', `Bukhari`], ['مسلم', `Muslim`],
  ['ترمذی', `Tirmidhi`], ['نسائی', `Nasa'i`],
  ['بنی اسرائیل', `Al-Isra`], ['الانبیاء', `Al-Anbiya`], ['الزخرف', `Az-Zukhruf`], ['طٰہٰ', `Ta-Ha`],
  ['الرعد', `Ar-Ra'd`], ['یوسف', `Yusuf`], ['الزمر', `Az-Zumar`], ['ابراہیم', `Ibrahim`],
  ['آل عمران', `Aal-Imran`], ['الفاتحہ', `Al-Fatiha`], ['الحدید', `Al-Hadid`], ['ص', `p.`]
];
function refEn(ref){
  let s = ref || '';
  REF_MAP.forEach(([a, b]) => { s = s.split(a).join(b); });
  s = s.replace(/[۰-۹]/g, c => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c));
  return s.replace(/،/g, ',');
}
function refL3(ref){ const e = refEn(ref); return L3(ref, e, e); }

/* ---------- Duas: Roman Urdu title + translation (by index in DUAS) ---------- */
const DUA_I18N = [
  {t:`Subah ki dua`, tr:`Aye Allah! Teri hi qudrat se hum subah ke waqt mein dakhil hue aur teri hi qudrat se hum shaam ke waqt mein dakhil hue, aur teri hi qudrat se hum jeete aur marte hain, aur teri hi taraf jana hai.`},
  {t:`Sooraj nikalne ke waqt ki dua`, tr:`Sab tareefein Allah hi ke liye hain jis ne aaj hamein maaf rakha aur gunahon ke sabab hamein halak na farmaya.`},
  {t:`Shaam ki dua`, tr:`Aye Allah! Hum teri hi qudrat se shaam ke waqt mein dakhil hue aur teri hi qudrat se subah ke waqt mein dakhil hue, aur teri hi qudrat se jeete aur marte hain, aur marne ke baad uth kar teri hi taraf jana hai.`},
  {t:`Subah o shaam ki ek khaas dua`, tr:`Allah ke naam se, jis ke naam ke sath na zameen mein koi cheez nuqsan de sakti hai na aasman mein, aur woh sunne wala aur jaanne wala hai. (Hazrat Usman (RA) farmate hain ke Rasoolullah ﷺ ne farmaya: jo banda har subah o shaam yeh kalimaat teen martaba parh liya kare to use koi cheez nuqsan nahi pohnchayegi.)`},
  {t:`Sone se pehle ki dua`, tr:`Aye Allah! Main tera hi naam le kar marta aur jeeta hoon. (Sote waqt yeh bhi parhein: SubhanAllah 33 baar, Alhamdulillah 33 baar, Allahu Akbar 34 baar.)`},
  {t:`Sote waqt hifazat ki dua`, tr:`Aye Allah! Mujhe apne azab se bachana jis roz tu apne bandon ko jama farmayega.`},
  {t:`So kar jaagne ki dua`, tr:`Sab tareefein Allah hi ke liye hain jis ne hamein maut de kar zindagi bakhshi, aur usi ki taraf uth kar jana hai.`},
  {t:`Bait-ul-khala mein dakhil hone ki dua`, tr:`Aye Allah! Main teri panah chahta hoon khabees jinnon se, mard hon ya aurat. (Pehle Bismillah kahein.)`},
  {t:`Bait-ul-khala se nikalne ki dua`, tr:`Sab tareefein Allah hi ke liye hain jis ne takleef dene wali cheez mujh se door ki aur mujhe sukoon diya.`},
  {t:`Wudu shuru karne ki dua`, tr:`Shuru karta hoon Allah ke naam se jo bara meharban, nihayat rahm wala hai.`},
  {t:`Wudu mukammal hone ke baad ki dua`, tr:`Main gawahi deta hoon ke Allah ke siwa koi mabood nahi, woh akela hai, us ka koi shareek nahi, aur main gawahi deta hoon ke Muhammad ﷺ Allah ke bande aur us ke Rasool hain. Aye Allah! Mujhe tauba karne walon mein aur paak rehne walon mein shamil farma.`},
  {t:`Masjid mein dakhil hone ki dua`, tr:`Aye Allah! Mere liye apni rehmat ke darwaze khol de.`},
  {t:`Masjid mein baithe baithe parhne ki dua`, tr:`Allah paak hai, aur sab tareefein Allah hi ke liye hain, aur Allah ke siwa koi mabood nahi, aur Allah sab se bara hai.`},
  {t:`Masjid se nikalne ki dua`, tr:`Aye Allah! Main tujh se tere fazl ka sawal karta hoon.`},
  {t:`Azan sunne ke waqt ka amal`, tr:`Jo muazzin kahe wohi alfaz dohrayein, siwae "Hayya alas-salah" aur "Hayya alal-falah" ke — un ke jawab mein yeh kahein: La hawla wa la quwwata illa billah (Allah ki madad ke baghair na koi taqat hai na quwwat).`},
  {t:`Azan khatam hone ke baad ki dua`, tr:`(Durood Shareef ke baad yeh dua parhein) Aye Allah! Is poori pukar ke Rab aur qaim hone wali namaz ke Rab! Muhammad ﷺ ko waseela aur fazeelat ata farma, aur un ko us maqam-e-mahmood par pohncha jis ka tu ne un se wada farmaya hai.`},
  {t:`Farz namaz ke salam ke baad ki dua`, tr:`(Salam ke baad sar par dayan haath rakh kar parhein) Main ne Allah ke naam ke sath (namaz khatam ki) jis ke siwa koi mabood nahi, jo Rehman o Raheem hai. Aye Allah! Tu mujh se fikr aur gham door kar de.`},
  {t:`Istighfar ke baad ki dua`, tr:`(Teen baar "Astaghfirullah" kehne ke baad yeh parhein) Aye Allah! Tu salamati wala hai aur tujh hi se salamati milti hai, tu barkat wala hai, aye azmat aur buzurgi wale!`},
  {t:`Namaz Witr ke baad ki dua`, tr:`Main paaki bayan karta hoon badshah yaani Allah ki, jo nihayat paak hai. (Teen martaba parhein, teesri baar awaz buland karein.)`},
  {t:`Namaz Fajr aur Maghrib ke baad ki dua`, tr:`Aye Allah! Mujhe dozakh se mehfooz farma. (Nabi ﷺ ne farmaya: jo Fajr aur Maghrib ke baad kisi se baat karne se pehle saat baar yeh parh le, us din ya raat mein mar jaye to dozakh se zaroor najat milegi.)`},
  {t:`Ghar se nikalne ki dua`, tr:`Main Allah ka naam le kar nikla, main ne Allah hi par bharosa kiya, gunahon se bachne aur ibadat karne ki taqat sirf Allah hi ki taraf se hai.`},
  {t:`Ghar mein dakhil hone ki dua`, tr:`Aye Allah! Main tujh se achha dakhil hona aur achha nikalna mangta hoon, Allah ka naam le kar hum dakhil hue aur Allah ka naam le kar hum nikle, aur Allah hi par jo hamara Rab hai bharosa kiya. (Is ke baad ghar walon ko salam karein.)`},
  {t:`Bazar mein jane ki dua`, tr:`Allah ke naam se, aye Allah! Main is bazar ki aur is mein jo kuch hai us ki bhalayi mangta hoon, aur teri panah chahta hoon is ke sharr se aur is mein jo kuch hai us ke sharr se.`},
  {t:`Khana shuru karne ki dua`, tr:`Main Allah ke naam se aur Allah ki barkat se khana shuru karta hoon.`},
  {t:`Shuru mein Bismillah kehna bhool jaye to`, tr:`Main ne is ke shuru aur aakhir mein Allah ka naam liya. (Yaad aane par yeh kahein. Hadees mein hai: jis khane mein Bismillah na parhi jaye, shaitan ko us mein se khane ka mauqa mil jata hai.)`},
  {t:`Khane ke baad ki dua`, tr:`Sab tareefein Allah hi ke liye hain jis ne hamein khilaya aur pilaya aur hamein Musalman banaya.`},
  {t:`Doodh pi kar parhne ki dua`, tr:`Aye Allah! Is mein hamare liye barkat de aur yeh hamein zyada naseeb farma.`},
  {t:`Dawat mein khana khane ki dua`, tr:`Aye Allah! Jis ne mujhe khilaya tu use khila, aur jis ne mujhe pilaya tu use pila.`},
  {t:`Mezban ke ghar se rukhsat hote waqt ki dua`, tr:`Aye Allah! Un ke rizq mein barkat de, un ko bakhsh de aur un par rehm farma.`},
  {t:`Roza iftar karne ki dua`, tr:`Aye Allah! Main ne tere hi liye roza rakha aur tere hi diye hue rizq se roza khola.`},
  {t:`Iftar ke baad ki dua`, tr:`Pyas chali gayi aur ragein tar ho gayin, aur Allah ke chahne se sawab sabit ho chuka.`},
  {t:`Kisi ke yahan iftar karne ki dua`, tr:`Tumhare paas roza daaron ne iftar kiya aur nek bandon ne tumhara khana khaya, aur tum par farishte rehmat bhejein.`},
  {t:`Kapra pehnne ki dua`, tr:`Sab tareefein Allah hi ke liye hain jis ne mujhe yeh kapra pehnaya aur baghair meri koshish aur taqat ke mujhe yeh naseeb kiya.`},
  {t:`Naya kapra pehnte waqt ki dua`, tr:`Aye Allah! Tere liye sab tareef hai, tu ne hi mujhe yeh pehnaya hai, main is ki bhalayi aur jis kaam ke liye yeh banaya gaya us ki bhalayi tujh se mangta hoon, aur is ke sharr aur jis kaam ke liye yeh banaya gaya us ke sharr se teri panah chahta hoon.`},
  {t:`Umoomi panah ki dua`, tr:`Main tujh se is cheez ki bhalayi aur jis kaam ke liye yeh banayi gayi us ki bhalayi ka sawal karta hoon, aur is ke sharr aur jis kaam ke liye yeh banayi gayi us ke sharr se teri panah chahta hoon.`},
  {t:`Aaine mein chehra dekhne ki dua`, tr:`Sab tareefein Allah hi ke liye hain. Aye Allah! Jaise tu ne meri soorat achhi banayi hai, mere akhlaq bhi achhe kar de.`},
  {t:`Dulha ko mubarakbad dene ki dua`, tr:`Allah tujhe barkat de aur tujh par barkat nazil kare, aur tum dono ko khair o bhalayi mein jama rakhe.`},
  {t:`Shab-e-Qadr mein mangne ki dua`, tr:`Aye Allah! Tu maaf farmane wala hai, maafi ko pasand farmata hai, pas mujhe maaf farma de.`},
  {t:`Naya chaand dekhne ki dua`, tr:`Aye Allah! Is chaand ko hum par barkat, imaan, salamati, Islam aur un amal ki tawfeeq ke sath nikaal jin se tu razi hai. (Aye chaand) mera aur tera Rab Allah hi hai.`},
  {t:`Kisi Musalman ko hasta dekh kar dua dena`, tr:`Allah tujhe hansata rakhe.`},
  {t:`Mareez ki iyadat karte waqt tasalli dena`, tr:`Kuch dar nahi, Allah ke chahne se yeh bimari tumhein gunahon se paak karne wali hai.`},
  {t:`Sawari par baithte waqt ki dua`, tr:`Paak hai woh zaat jis ne is (sawari) ko hamare liye musakhkhar kiya, warna hum ise qaboo mein lane wale na thay, aur be shak hum apne Rab hi ki taraf laut kar jane wale hain.`},
  {t:`Kisi manzil (bus stop, railway station) par utarne ki dua`, tr:`Allah ke poore kalimaat ke wasite se Allah ki panah chahta hoon us ki makhlooq ke sharr se.`},
  {t:`Qabristan mein jane ki dua`, tr:`Aye qabron walo! Tum par salamati ho, Allah hamari aur tumhari maghfirat farmaye, tum hum se pehle ja chuke ho aur hum tumhare peechhe aane wale hain.`},
  {t:`Walidain ke liye dua`, tr:`Aye mere Rab! In dono par rehm farma jaisa ke unhon ne bachpan mein meri parwarish ki.`},
  {t:`Ilm mein izafe ki dua`, tr:`Aye mere Rab! Mere ilm mein izafa farma.`},
  {t:`Kamon mein aasani ki dua`, tr:`Aye mere Rab! Mera seena khol de aur mera kaam mere liye aasan farma.`},
  {t:`Barish ke waqt ki dua`, tr:`Aye Allah! Ise nafa bakhsh barish bana de.`},
  {t:`Pareshani ke waqt ki dua`, tr:`Tere siwa koi mabood nahi, tu paak hai, be shak main hi zalimon mein se tha.`},
  {t:`Sayyid-ul-Istighfar`, tr:`Aye Allah! Tu mera Rab hai, tere siwa koi mabood nahi, tu ne mujhe paida kiya aur main tera banda hoon, aur main hasb-e-istitaat tere ahd aur wade par qaim hoon, main apne kiye hue kamon ki burai se teri panah mangta hoon, main teri un nemton ka iqrar karta hoon jo mujh par hain, aur apne gunah ka iqrar karta hoon, pas tu mujhe bakhsh de, kyunke tere siwa koi gunah nahi bakhshta.`}
];

/* ---------- Tasbeeh / Azkar (by id) ---------- */
const AZKAR_I18N = {
  t1: {cat:{en:`Praise and glory`, ro:`Hamd o Sana`}, tr:{en:`Glory be to Allah, and praise be to Him.`, ro:`Allah paak hai aur usi ki tareef ke sath.`}},
  t2: {cat:{en:`Repentance and forgiveness`, ro:`Tauba o Istighfar`}, tr:{en:`I seek forgiveness from Allah.`, ro:`Main Allah se bakhshish mangta hoon.`}},
  t3: {cat:{en:`Declaration of Oneness`, ro:`Kalima Tauheed`}, tr:{en:`There is no deity except Allah.`, ro:`Allah ke siwa koi mabood nahi.`}},
  t4: {cat:{en:`Durood (blessings on the Prophet ﷺ)`, ro:`Durood Shareef`}, tr:{en:`O Allah, send blessings upon Muhammad and the family of Muhammad.`, ro:`Aye Allah! Muhammad aur un ki aal par rehmat nazil farma.`}},
  t5: {cat:{en:`Trust in Allah`, ro:`Bharosa o Tawakkul`}, tr:{en:`Allah is sufficient for us, and He is the best disposer of affairs.`, ro:`Hamare liye Allah kafi hai aur woh behtareen karsaz hai.`}},
  t6: {cat:{en:`Power and strength`, ro:`Taqat o Quwwat`}, tr:{en:`There is no power and no strength except with Allah.`, ro:`Allah ki madad ke baghair na koi taqat hai na quwwat.`}},
  t7: {cat:{en:`Glorifying the Almighty`, ro:`Tasbeeh-e-Azeem`}, tr:{en:`Glory be to Allah, the Magnificent, and praise be to Him.`, ro:`Allah buzurg o bartar paak hai aur usi ki tareef ke sath.`}},
  t8: {cat:{en:`After the prayer (salam)`, ro:`Salam pherne ke baad`}, tr:{en:`The well-known tasbeeh after prayer — SubhanAllah, Alhamdulillah, Allahu Akbar.`, ro:`Namaz ke baad ki mashhoor tasbeeh — SubhanAllah, Alhamdulillah, Allahu Akbar.`}},
  t9: {cat:{en:`Gratitude`, ro:`Shukar guzari`}, tr:{en:`All praise is for Allah, the Lord of all the worlds.`, ro:`Tamam tareefein Allah ke liye hain jo saare jahanon ka Rab hai.`}},
  t10:{cat:{en:`The greatness of Allah`, ro:`Azmat-e-Ilahi`}, tr:{en:`Allah is the Greatest, far greater.`, ro:`Allah sab se bara hai, bohat bara.`}},
  t11:{cat:{en:`Dua of Prophet Musa (AS) — when in need`, ro:`Dua-e-Musa (AS) — hajat ke waqt`}, tr:{en:`My Lord, I am in need of whatever good You send down to me.`, ro:`Aye mere Rab! Jo bhalayi bhi tu meri taraf nazil farmaye, main us ka mohtaj hoon.`}}
};

/* ---------- Asma-ul-Husna: Roman Urdu meanings (same order as ASMA_UL_HUSNA) ---------- */
const ASMA_RO = [
  `Nihayat rahm wala`, `Nihayat meharban`, `Badshah`, `Nihayat paak`, `Salamati wala`, `Aman dene wala`, `Nigehban`, `Ghalib`, `Zabardast`, `Barai wala`,
  `Paida karne wala`, `Baghair namune ke paida karne wala`, `Soorat banane wala`, `Baar baar maaf karne wala`, `Sab par ghalib`, `Bohat ata karne wala`, `Rizq dene wala`, `Faisla karne wala`, `Sab kuch jaanne wala`, `Tangi dene wala`,
  `Wusat dene wala`, `Past karne wala`, `Buland karne wala`, `Izzat dene wala`, `Zillat dene wala`, `Sab kuch sunne wala`, `Sab kuch dekhne wala`, `Faisla karne wala`, `Adl karne wala`, `Bareek been`,
  `Khabar rakhne wala`, `Bardbar`, `Azmat wala`, `Bakhshne wala`, `Qadardan`, `Sab se buland`, `Sab se bara`, `Hifazat karne wala`, `Rozi pohanchane wala`, `Hisaab lene wala`,
  `Jalal wala`, `Karam karne wala`, `Nigrani karne wala`, `Qubool karne wala`, `Wusat wala`, `Hikmat wala`, `Mohabbat karne wala`, `Buzurgi wala`, `Dobara zinda karne wala`, `Gawah`,
  `Saccha`, `Karsaz`, `Quwwat wala`, `Mazboot`, `Dost`, `Tareef ke laiq`, `Ginne wala`, `Pehli baar paida karne wala`, `Dobara paida karne wala`, `Zindagi dene wala`,
  `Maut dene wala`, `Hamesha zinda`, `Hamesha qaim rehne wala`, `Paane wala`, `Buzurgi wala`, `Akela`, `Ek`, `Be-niyaz`, `Qudrat wala`, `Ghalib qudrat wala`,
  `Aage karne wala`, `Peechhe karne wala`, `Sab se pehla`, `Sab se aakhir`, `Zahir`, `Poshida`, `Hakim`, `Buland o bartar`, `Bhalayi karne wala`, `Tauba qubool karne wala`,
  `Inteqam lene wala`, `Maaf karne wala`, `Nihayat shafeeq`, `Badshahat ka malik`, `Jalal o Ikram wala`, `Insaf karne wala`, `Jama karne wala`, `Be-niyaz`, `Ghani karne wala`, `Rokne wala`,
  `Nuqsan pohanchane wala`, `Nafa dene wala`, `Noor`, `Hidayat dene wala`, `Anokhi cheezein banane wala`, `Hamesha baaqi rehne wala`, `Waris`, `Raah dikhane wala`, `Sabr wala`
];

/* ---------- Emotional Feelings & Dua (by mood id) ---------- */
const MOOD_I18N = {
  anxious: {label:{en:`Anxious / Worried`, ro:`Pareshan`}, tr:{en:`Unquestionably, in the remembrance of Allah do hearts find rest.`, ro:`Suno! Allah ke zikr se hi dilon ko itminan milta hai.`},
    note:{ur:`جب دل بہت پریشان ہو تو تھوڑا رک کر سکون سے اللہ کا ذکر کریں — «سبحان اللہ»، «الحمدللہ»، یا بس «اللہ» کا نام لے کر سانس لیں۔ یہ پریشانی فوراً ختم نہیں کرے گا، لیکن دل کو سہارا ضرور دے گا۔`,
          en:`When your heart is very anxious, pause and remember Allah calmly — say “SubhanAllah”, “Alhamdulillah”, or simply “Allah” and breathe. It may not remove the worry instantly, but it will certainly support your heart.`,
          ro:`Jab dil bohat pareshan ho to thora ruk kar sukoon se Allah ka zikr karein — "SubhanAllah", "Alhamdulillah", ya bas "Allah" ka naam le kar saans lein. Yeh pareshani foran khatam nahi karega, lekin dil ko sahara zaroor dega.`}},
  sad: {label:{en:`Sad`, ro:`Ghamgeen`}, tr:{en:`I only complain of my suffering and my grief to Allah.`, ro:`Main to apni pareshani aur gham ki fariyad sirf Allah hi se karta hoon.`},
    note:{ur:`حضرت یعقوب علیہ السلام نے اپنا غم اللہ کے سامنے رکھا، کسی اور کے سامنے نہیں۔ آپ کا غم بھی سیدھا اللہ تک پہنچتا ہے — دعا میں کھل کر رو لیں، شرمندہ نہ ہوں۔`,
          en:`Prophet Yaqub (AS) laid his grief before Allah alone, not before anyone else. Your grief also reaches Allah directly — cry openly in dua and do not feel ashamed.`,
          ro:`Hazrat Yaqoob (AS) ne apna gham Allah ke samne rakha, kisi aur ke samne nahi. Aap ka gham bhi seedha Allah tak pohanchta hai — dua mein khul kar ro lein, sharminda na hon.`}},
  hopeless: {label:{en:`Hopeless / Despair`, ro:`Mayoos`}, tr:{en:`Do not despair of the mercy of Allah. Indeed, Allah forgives all sins.`, ro:`Allah ki rehmat se mayoos mat ho, be shak Allah saare gunah bakhsh deta hai.`},
    note:{ur:`چاہے کچھ بھی ہو چکا ہو، اللہ کی رحمت سے امید نہیں توڑنی۔ یہ آیت خاص طور پر ان لوگوں کے لیے نازل ہوئی جو اپنے آپ کو بہت گنہگار سمجھتے ہیں — اللہ کا دروازہ ہمیشہ کھلا ہے۔`,
          en:`No matter what has happened, never lose hope in Allah’s mercy. This verse was revealed especially for those who consider themselves great sinners — Allah’s door is always open.`,
          ro:`Chahe kuch bhi ho chuka ho, Allah ki rehmat se umeed nahi todni. Yeh ayat khaas taur par un logon ke liye nazil hui jo apne aap ko bohat gunahgar samajhte hain — Allah ka darwaza hamesha khula hai.`}},
  grateful: {label:{en:`Grateful`, ro:`Shukar guzar`}, tr:{en:`And [remember] when your Lord proclaimed: if you are grateful, I will surely increase you [in favour].`, ro:`Aur yaad karo jab tumhare Rab ne elaan kiya ke agar tum shukar karoge to main tumhein zaroor zyada dunga.`},
    note:{ur:`شکر ادا کرنے کا سب سے اچھا طریقہ یہ ہے کہ جو ملا ہے اس پر «الحمدللہ» کہیں اور زبان سے بھی اظہار کریں۔ اللہ کا وعدہ ہے کہ شکر کرنے والوں کو اور عطا فرماتا ہے۔`,
          en:`The best way to show gratitude is to say “Alhamdulillah” for what you have received and to express it with your tongue. Allah has promised to give more to those who are grateful.`,
          ro:`Shukar ada karne ka sab se acha tareeqa yeh hai ke jo mila hai us par "Alhamdulillah" kahein aur zaban se bhi izhar karein. Allah ka wada hai ke shukar karne walon ko aur ata farmata hai.`}},
  angry: {label:{en:`Angry`, ro:`Ghussa`}, tr:{en:`The strong person is not the one who overpowers others in wrestling; the strong person is the one who controls himself in anger.`, ro:`Taqatwar woh nahi jo kushti mein doosron ko pachhad de, balkay taqatwar woh hai jo ghusse ke waqt apne aap par qaboo rakhe.`},
    note:{ur:`نبی ﷺ نے فرمایا: جب غصہ آئے تو وضو کر لو، اگر کھڑے ہو تو بیٹھ جاؤ، اگر بیٹھے ہو تو لیٹ جاؤ۔ چھوٹا سا عمل ہے مگر بہت اثر رکھتا ہے۔`,
          en:`The Prophet ﷺ advised: when anger comes, make wudu; if you are standing, sit down; if you are sitting, lie down. A small act, but very effective.`,
          ro:`Nabi ﷺ ne farmaya: jab ghussa aaye to wazu kar lo, agar khare ho to baith jao, agar baithe ho to late jao. Chhota sa amal hai magar bohat asar rakhta hai.`}},
  scared: {label:{en:`Scared / Fearful`, ro:`Khauf zada`}, tr:{en:`Allah is sufficient for us, and He is the best disposer of affairs.`, ro:`Hamare liye Allah kafi hai aur woh behtareen karsaz hai.`},
    note:{ur:`یہ وہی کلمات ہیں جو حضرت ابراہیم علیہ السلام نے آگ میں ڈالے جاتے وقت کہے۔ جس خوف میں بھی ہوں، اللہ پر بھروسہ رکھیں — وہ سب سے بہتر مددگار ہے۔`,
          en:`These are the very words Prophet Ibrahim (AS) said when he was thrown into the fire. Whatever you fear, trust in Allah — He is the best Helper.`,
          ro:`Yeh wohi kalimaat hain jo Hazrat Ibrahim (AS) ne aag mein daale jate waqt kahe. Jis khauf mein bhi hon, Allah par bharosa rakhein — woh sab se behtar madadgar hai.`}},
  guidance: {label:{en:`Need Guidance`, ro:`Rehnumayi chahiye`}, tr:{en:`Guide us to the straight path.`, ro:`Hamein seedhe raste ki hidayat farma.`},
    note:{ur:`یہ دعا ہر نماز میں کم از کم 17 بار پڑھتے ہیں — اللہ سے سیدھی راہ مانگنا سب سے بڑا عمل ہے۔ فیصلہ مشکل ہو تو صلاۃ الاستخارہ بھی پڑھ سکتے ہیں۔`,
          en:`This dua is recited at least 17 times a day in the daily prayers — asking Allah for the straight path is the greatest act. If a decision is difficult, you can also pray Salat-ul-Istikhara.`,
          ro:`Yeh dua har namaz mein kam az kam 17 baar parhte hain — Allah se seedhi raah mangna sab se bara amal hai. Faisla mushkil ho to Salat-ul-Istikhara bhi parh sakte hain.`}},
  lonely: {label:{en:`Lonely`, ro:`Tanha`}, tr:{en:`And He is with you wherever you are.`, ro:`Aur woh tumhare sath hai, tum jahan kahin bhi ho.`},
    note:{ur:`چاہے کوئی پاس نہ ہو، اللہ ہر وقت ساتھ ہے — دیکھ رہا ہے، سن رہا ہے۔ تنہائی میں بھی دعا کرنا ایسی گفتگو ہے جو کبھی نظر انداز نہیں ہوتی۔`,
          en:`Even if no one is near, Allah is with you at all times — He sees and hears. Making dua in loneliness is a conversation that is never ignored.`,
          ro:`Chahe koi paas na ho, Allah har waqt sath hai — dekh raha hai, sun raha hai. Tanhayi mein bhi dua karna aisi guftagu hai jo kabhi nazar andaz nahi hoti.`}}
};

/* ---------- Six Kalimas (by index) ---------- */
const KALIMA_I18N = [
  {t:{en:`First Kalima — Tayyibah (Purity)`, ro:`Pehla Kalima — Kalima Tayyibah`},
   tr:{en:`There is no deity but Allah; Muhammad ﷺ is the Messenger of Allah.`, ro:`Allah ke siwa koi mabood nahi, Muhammad ﷺ Allah ke Rasool hain.`}},
  {t:{en:`Second Kalima — Shahadat (Testimony)`, ro:`Doosra Kalima — Kalima Shahadat`},
   tr:{en:`I bear witness that there is no deity but Allah, He is One and has no partner, and I bear witness that Muhammad ﷺ is His servant and Messenger.`, ro:`Main gawahi deta hoon ke Allah ke siwa koi mabood nahi, woh akela hai us ka koi shareek nahi, aur main gawahi deta hoon ke Muhammad ﷺ us ke bande aur us ke Rasool hain.`}},
  {t:{en:`Third Kalima — Tamjeed (Glorification)`, ro:`Teesra Kalima — Kalima Tamjeed`},
   tr:{en:`Glory be to Allah, all praise is for Allah, there is no deity but Allah, Allah is the Greatest, and there is no power or strength except with Allah, the Most High, the Magnificent.`, ro:`Allah paak hai, aur sab tareefein Allah ke liye hain, aur Allah ke siwa koi mabood nahi, aur Allah sab se bara hai, aur neki ki tawfeeq aur gunah se bachne ki taqat Allah hi ki madad se hai jo buland o buzurg hai.`}},
  {t:{en:`Fourth Kalima — Tauheed (Oneness)`, ro:`Chautha Kalima — Kalima Tauheed`},
   tr:{en:`There is no deity but Allah, He is One, with no partner. His is the dominion and His is the praise. He gives life and causes death, and He is Ever-Living and will never die. Possessor of majesty and honour, in His hand is all good, and He has power over everything.`, ro:`Allah ke siwa koi mabood nahi, woh akela hai us ka koi shareek nahi, badshahi usi ki hai aur tareef bhi usi ke liye hai, wohi zinda karta aur maarta hai, aur woh hamesha zinda hai kabhi nahi marega, buzurgi aur izzat wala hai, bhalayi usi ke haath mein hai, aur woh har cheez par qadir hai.`}},
  {t:{en:`Fifth Kalima — Astaghfar (Seeking Forgiveness)`, ro:`Panchwan Kalima — Kalima Astaghfar`},
   tr:{en:`I seek forgiveness from my Lord Allah for every sin I committed, intentionally or by mistake, secretly or openly, and I repent to Him from the sins I know and the sins I do not know. Indeed You alone know the unseen, conceal faults and forgive sins, and there is no power or strength except with Allah, the Most High, the Magnificent.`, ro:`Main apne Rab Allah se har us gunah ki bakhshish mangta hoon jo mujh se jaan boojh kar ya bhool kar, chhup kar ya zahir mein hua, aur main us gunah se bhi tauba karta hoon jise main jaanta hoon aur jise nahi jaanta. Be shak tu hi ghaib ki baatein jaanne wala, aibon ko chhupane wala aur gunahon ko bakhshne wala hai, aur neki ki tawfeeq Allah hi ki madad se milti hai jo buland o buzurg hai.`}},
  {t:{en:`Sixth Kalima — Radd-e-Kufr (Rejecting Disbelief)`, ro:`Chhatha Kalima — Kalima Radd-e-Kufr`},
   tr:{en:`O Allah, I seek refuge in You from knowingly associating anything with You, and I seek Your forgiveness for what I do not know. I repent from it and I disown disbelief, polytheism, lying, backbiting, innovation, slander, indecency, false accusation and all sins. I have submitted, and I say: there is no deity but Allah, Muhammad ﷺ is the Messenger of Allah.`, ro:`Aye Allah! Main is baat se teri panah mangta hoon ke jaan boojh kar tere sath kisi ko shareek thehraon, aur jo mujhe maloom nahi us ke liye bhi tujh se bakhshish mangta hoon. Main ne us se tauba ki aur kufr, shirk, jhoot, gheebat, bidat, chughli, behayayi, buhtan aur tamam gunahon se bezari ka izhar kiya, aur main Islam laya aur kehta hoon: Allah ke siwa koi mabood nahi, Muhammad ﷺ Allah ke Rasool hain.`}}
];

/* ---------- Wudu & Namaz guide (Roman + English step titles) ---------- */
const GUIDE_I18N = {
  topics: {
    wudu:  {title:{en:`How to perform Wudu`, ro:`Wudu ka Tareeqa`}},
    namaz: {title:{en:`How to pray (2 Rak'ah)`, ro:`Namaz ka Tareeqa (2 Rakat)`}}
  },
  steps: {
    wudu: [
      {t:{en:`Intention and Bismillah`, ro:`Niyyat aur Bismillah`}, d:`Dil mein wudu ki niyyat karein aur "Bismillah" keh kar shuru karein.`},
      {t:{en:`Wash the hands`, ro:`Haath dhoyein`}, d:`Dono haath gatton tak teen baar dhoyein, ungliyon ke darmiyan bhi khilal karein.`},
      {t:{en:`Rinse the mouth`, ro:`Kulli karein`}, d:`Teen baar munh mein paani daal kar kulli karein.`},
      {t:{en:`Water in the nose`, ro:`Naak mein paani`}, d:`Teen baar naak mein paani chadha kar saaf karein.`},
      {t:{en:`Wash the face`, ro:`Chehra dhoyein`}, d:`Peshani ke baalon se thori tak, aur ek kaan se doosre kaan tak, poora chehra teen baar dhoyein.`},
      {t:{en:`Wash the arms`, ro:`Bazoo dhoyein`}, d:`Dono bazoo kohniyon samet teen teen baar dhoyein — pehle dayan phir bayan.`},
      {t:{en:`Wipe the head`, ro:`Sar ka mash`}, d:`Geele haathon se ek baar poore sar par haath pherein (mash karein).`},
      {t:{en:`Wipe the ears`, ro:`Kaanon ka mash`}, d:`Ungliyon se kaanon ke andar aur bahar ka mash karein.`},
      {t:{en:`Wash the feet`, ro:`Paon dhoyein`}, d:`Dono paon, takhnon samet, teen teen baar dhoyein — pehle dayan phir bayan. Ungliyon ke darmiyan khilal karna na bhoolein.`}
    ],
    namaz: [
      {t:{en:`Intention and Takbir`, ro:`Niyyat aur Takbeer-e-Tahreema`}, d:`Qibla ki taraf rukh kar ke dil mein niyyat karein, phir dono haath kaanon tak utha kar "Allahu Akbar" kahein aur haath baandh lein.`},
      {t:{en:`Opening supplication, Ta'awwuz, Tasmiyah`, ro:`Sana, Ta'awwuz, Tasmiyah`}, d:`"Subhanakallahumma..." (Sana) parhein, phir "A'udhu billah..." aur "Bismillah..." kahein.`},
      {t:{en:`Surah Al-Fatiha and a surah`, ro:`Surah Fatiha aur Surah`}, d:`Surah Al-Fatiha parhein, phir koi bhi chhoti surah (jese Al-Ikhlas) milayein.`},
      {t:{en:`Ruku (bowing)`, ro:`Ruku`}, d:`"Allahu Akbar" kehte hue jhuk kar ruku karein, haath ghutnon par rakhein, "Subhana Rabbiyal Azeem" teen baar kahein.`},
      {t:{en:`Qauma (standing up)`, ro:`Qauma (seedha khara hona)`}, d:`"Sami'Allahu liman hamidah" kehte hue seedhe khare hon, phir "Rabbana lakal hamd" kahein.`},
      {t:{en:`Sajdah (prostration)`, ro:`Sajdah`}, d:`"Allahu Akbar" kehte hue sajde mein jayein, "Subhana Rabbiyal A'la" teen baar kahein.`},
      {t:{en:`Jalsa (sitting between prostrations)`, ro:`Jalsa (do sajdon ke darmiyan baithna)`}, d:`Thori der baith kar phir doosra sajdah karein. Yeh ek rakat mukammal hui.`},
      {t:{en:`Second rak'ah`, ro:`Doosri rakat`}, d:`Khare ho kar doosri rakat mein bhi wohi tarteeb dohrayein (Fatiha + Surah + Ruku + Sajde).`},
      {t:{en:`Tashahhud (sitting)`, ro:`Tashahhud (Qa'dah)`}, d:`Do rakaton ke baad baith kar "At-Tahiyyat..." parhein. Agar do rakat wali namaz hai to isi baithak mein Durood aur dua bhi parh kar salam pher dein.`},
      {t:{en:`Salam`, ro:`Salam`}, d:`Dayen taraf "Assalamu alaikum wa rahmatullah" kehte hue chehra pheren, phir bayen taraf bhi. Namaz mukammal ho gayi.`}
    ]
  }
};

/* ---------- Charity descriptions (by index in CHARITIES) ---------- */
const CHARITY_I18N = [
  {ur:`پاکستان کی سب سے پرانی اور بڑی فلاحی تنظیم — ایمبولینس، یتیم خانے، بزرگوں کے گھر اور ہنگامی امداد 1951 سے فراہم کر رہی ہے۔`,
   en:`Pakistan’s oldest and largest welfare organisation — providing ambulances, orphanages, old-age homes and emergency relief since 1951.`,
   ro:`Pakistan ki sab se purani aur bari falahi tanzeem — ambulance, orphanage, old-age homes aur emergency relief 1951 se faraham kar rahi hai.`},
  {ur:`آفت زدہ علاقوں میں امدادی کام، صحت، تعلیم اور یتیموں کی دیکھ بھال — ملک بھر میں سرگرم ہے۔`,
   en:`Disaster relief, healthcare, education and orphan care — active across the country.`,
   ro:`Aafat-zada ilaqon mein imdadi kaam, sehat, taleem aur yateemon ki dekh bhaal — mulk bhar mein sargarm hai.`},
  {ur:`روزانہ ہزاروں لوگوں کو کھانا، صحت اور تعلیمی سہولت فراہم کرتا ہے — دسترخوان اور تربیتی پروگرام مشہور ہیں۔`,
   en:`Provides food, healthcare and educational support to thousands of people daily — known for its dastarkhwan (free meals) and training programmes.`,
   ro:`Rozana hazaron logon ko khana, sehat aur taleemi sahulat faraham karta hai — dastarkhwan aur training programs mashhoor hain.`},
  {ur:`کراچی میں ایمبولینس اور ریسکیو خدمات، ساتھ ہی روزانہ ہزاروں لوگوں کو کھانا بھی فراہم کرتا ہے۔`,
   en:`Ambulance and rescue services in Karachi, and free meals for thousands of people every day.`,
   ro:`Karachi mein ambulance aur rescue khidmaat, saath hi rozana hazaron logon ko khana bhi faraham karta hai.`},
  {ur:`بلا سود قرضے دیتا ہے تاکہ لوگ اپنا چھوٹا کام شروع کر سکیں — غربت ختم کرنے کا مستند طریقہ۔`,
   en:`Gives interest-free loans so people can start a small business — a proven way to reduce poverty.`,
   ro:`Bila-sood (bina interest) qarze deta hai taake log apna chhota kaam shuru kar saken — gharibi khatam karne ka mustanad tareeqa.`},
  {ur:`اپنے زیادہ تر مریضوں کو کینسر کا علاج مفت یا رعایتی نرخ پر فراہم کرتا ہے، چاہے ادائیگی کی صلاحیت نہ ہو۔`,
   en:`Provides free or subsidised cancer treatment to the majority of its patients, regardless of their ability to pay.`,
   ro:`Apne zyada tar mareezon ko cancer ka ilaj muft ya riayati nirkh par faraham karta hai, adaigi ki salahiyat na ho tab bhi.`},
  {ur:`ہر سال لاکھوں مریضوں کو بالکل مفت، معیاری علاج فراہم کرتا ہے۔`,
   en:`Provides quality healthcare completely free of charge to lakhs of patients every year.`,
   ro:`Har saal lakhon mareezon ko bilkul muft, miyari ilaj faraham karta hai.`}
];

/* ---------- Bedtime stories (by index): English + Roman Urdu ---------- */
const STORIES_I18N = [
  {t:{en:`Prophet Ibrahim (AS) and the Idols`, ro:`Hazrat Ibrahim (AS) aur But`}, ref:`Al-Anbiya 21:51–70`,
   en:`Long ago, the people of Prophet Ibrahim (peace be upon him) used to make idols of stone and worship them. Ibrahim (AS) found this very strange — how could stone statues ever help anyone?

One day, when everyone had gone out to a festival, Ibrahim (AS) went into the temple and broke all the idols except the biggest one. He hung the axe on the shoulder of the big idol.

When the people returned, they were furious. They asked, "Who did this?" Ibrahim (AS) smiled and said, "Maybe the biggest idol did it — ask him!"

The people felt ashamed, because they knew idols cannot speak. Then Ibrahim (AS) said: Why do you worship things that can neither speak nor hear?

Lesson: Only Allah can truly help us, and we should never be afraid of speaking the truth.`,
   ro:`Bohat purane zamane ki baat hai. Hazrat Ibrahim (AS) ki qaum pathar ke but bana kar un ki pooja karti thi. Hazrat Ibrahim (AS) ko yeh baat bohat ajeeb lagti — bhala pathar ki moortiyan kisi ki madad kaise kar sakti hain?

Ek din jab saare log mele par gaye hue thay, Hazrat Ibrahim (AS) butkhane mein gaye aur sab se bare but ke siwa baaqi saare but tod diye. Kulhari unhon ne bare but ke kandhe par rakh di.

Jab log wapas aaye to bohat ghusse mein aa gaye. Unhon ne poocha: "Yeh kis ne kiya?" Hazrat Ibrahim (AS) ne muskurate hue kaha: "Shayad isi bare but ne kiya ho, isi se pooch lo!"

Log sharminda ho gaye, kyunke woh jaante thay ke but bol nahi sakte. Tab Hazrat Ibrahim (AS) ne farmaya: Phir tum aisi cheezon ki pooja kyun karte ho jo na bol sakein na sun sakein?

Sabaq: Allah ke siwa koi bhi hamari madad nahi kar sakta, aur sachchayi kehne se kabhi nahi darna chahiye.`},
  {t:{en:`Prophet Yunus (AS) and the Fish`, ro:`Hazrat Yunus (AS) aur Machhli`}, ref:`As-Saffat 37:139–148`,
   en:`Prophet Yunus (AS) called his people to Allah, but they did not listen. Upset, he boarded a ship and left the city without waiting for Allah's permission.

A storm struck the sea. The people on the ship said that one of them would have to be thrown overboard or the ship would sink. They drew lots, Yunus's name came up, and he jumped into the sea.

Allah sent a great fish which swallowed him, but by Allah's command it did not harm him. In the darkness inside the fish, Yunus (AS) prayed:

"La ilaha illa Anta, subhanaka, inni kuntu minaz-zalimin" (There is no deity except You, glory be to You, indeed I was among the wrongdoers).

Allah accepted his prayer and the fish cast him onto the shore.

Lesson: Whenever you are in trouble, ask Allah for forgiveness and be patient — Allah surely helps.`,
   ro:`Hazrat Yunus (AS) apni qaum ko Allah ki taraf bulate thay, magar log nahi mane. Woh naraz ho kar ek kashti mein baith gaye aur Allah se ijazat liye baghair shehar chhor diya.

Samandar mein toofan aa gaya. Kashti walon ne kaha: kisi ek ko samandar mein phenkna hoga warna kashti doob jayegi. Qura andazi hui to Hazrat Yunus (AS) ka naam nikla, aur woh samandar mein kood gaye.

Allah Ta'ala ne ek bari machhli bheji jis ne unhein nigal liya, magar Allah ke hukm se machhli ne unhein nuqsan na pohnchaya. Machhli ke pet ke andhere mein Hazrat Yunus (AS) ne dua ki:

"La ilaha illa Anta, subhanaka, inni kuntu minaz-zalimin" (Tere siwa koi mabood nahi, tu paak hai, be shak main hi zalimon mein se tha).

Allah ne un ki dua qubool ki aur machhli ne unhein sahil par ugal diya.

Sabaq: Jab bhi mushkil mein hon, Allah se maafi mangein aur sabr karein — Allah zaroor madad farmata hai.`},
  {t:{en:`Ashab-e-Kahf — The Youths of the Cave`, ro:`Ashab-e-Kahf — Ghaar wale nojawan`}, ref:`Al-Kahf 18:9–26`,
   en:`Long ago there were some young men who believed in Allah, but the king of their city was a tyrant who made people worship idols. To protect their faith, the young men left the city and took shelter in a cave.

They prayed: "Our Lord, grant us mercy from Yourself and prepare for us right guidance in our affair."

Allah caused them to fall asleep, and they slept in that cave for hundreds of years. Their dog also kept guard at the entrance of the cave.

When they woke up, they thought they had only slept for a short while. When one of them went to the city to buy food, people were astonished — he was paying with coins from so many years ago! Only then did they realise how much time had passed.

Lesson: Allah protects those who stay firm on their faith and put their trust in Him.`,
   ro:`Bohat arsa pehle kuch nojawan thay jo Allah par imaan laye thay, magar un ke shehar ka badshah zalim tha aur butparasti karwata tha. In nojawanon ne apna imaan bachane ke liye shehar chhor diya aur ek ghaar mein panah li.

Unhon ne dua ki: "Aye hamare Rab! Hamein apni rehmat ata farma aur hamare mamle mein durustgi paida kar."

Allah Ta'ala ne un par neend tari kar di, aur woh sainkron saal us ghaar mein sote rahe. Un ka kutta bhi ghaar ke darwaze par un ki hifazat karta raha.

Jab woh jaage to unhein laga bas thori der soye thay. Ek sathi khana lene shehar gaya to log hairan reh gaye — itne saal purane sikke! Tab unhein pata chala ke kitna waqt guzar chuka hai.

Sabaq: Jo log apne imaan par date rehte hain aur Allah par bharosa karte hain, Allah un ki hifazat farmata hai.`},
  {t:{en:`The Prophet ﷺ — Al-Ameen (the Trustworthy)`, ro:`Nabi Kareem ﷺ — Al-Ameen (Sachay aur Amanatdar)`}, ref:`Seerah of the Prophet ﷺ`,
   en:`Even before prophethood, the people of Makkah called the Prophet ﷺ "Al-Ameen" — the trustworthy one — because he never lied and always returned whatever was entrusted to him.

A famous event: the Kaaba was being rebuilt, and a dispute arose over who should place the Black Stone in its position — every tribe wanted that honour. The argument grew so heated that fighting seemed likely.

Someone suggested that the first person to enter the next morning should decide the matter. In the morning, everyone saw the Prophet ﷺ coming. They were all pleased, because they all trusted him.

The Prophet ﷺ spread out a cloak, placed the stone on it, and asked the leader of each tribe to hold a corner of the cloak and lift the stone together. Then he placed the stone in its place with his own hands. Everyone was satisfied and the fighting was avoided.

Lesson: Honesty and trustworthiness win everyone's trust.`,
   ro:`Nabuwwat se pehle bhi Makkah ke log Nabi Kareem ﷺ ko "Al-Ameen" yaani amanatdar kehte thay, kyunke aap ﷺ kabhi jhoot nahi bolte thay aur jo amanat rakhi jati use sahih salamat wapas karte thay.

Ek waqia mashhoor hai: Khana Kaaba ki tameer ho rahi thi, aur Hajr-e-Aswad (kala pathar) ko apni jagah rakhne par jhagra ho gaya — har qabila chahta tha ke yeh aizaz usay mile. Baat itni barh gayi ke larai ka khatra paida ho gaya.

Tab kisi ne tajweez di: jo bhi kal subah sab se pehle aaye, faisla usi par chhor diya jaye. Subah sab ne dekha ke Nabi Kareem ﷺ aa rahe hain. Sab khush ho gaye kyunke sab aap ﷺ par bharosa karte thay.

Aap ﷺ ne ek chaadar bichayi, pathar us par rakha, aur har qabile ke sardar se chaadar ka ek kona pakadwa kar sab se mil kar pathar ko uthwaya. Phir khud apne haath se pathar ko us ki jagah rakh diya. Sab razi ho gaye aur larai tal gayi.

Sabaq: Sachchayi aur amanatdari se insaan sab ka bharosa jeet leta hai.`},
  {t:{en:`The Patience of Bilal (RA)`, ro:`Hazrat Bilal (RA) ka Sabr`}, ref:`Seerah of the Companions`,
   en:`Hazrat Bilal (RA) was a slave who accepted Islam. His master, Umayyah ibn Khalaf, was very angry and would make him lie on the burning desert sand with a heavy rock on his chest, so that he would give up Islam.

Yet even in that pain he kept repeating one thing: "Ahad, Ahad" (Allah is One, Allah is One) — he stayed firm on his faith.

Hazrat Abu Bakr (RA) saw his condition, bought him and set him free. Later, when the question of giving the first adhan in Madinah came up, the Prophet ﷺ honoured Hazrat Bilal (RA) with this task — he became the first muazzin of Islam.

Lesson: Allah honours those who remain steadfast in their faith even in hard times.`,
   ro:`Hazrat Bilal (RA) ek ghulam thay jinhon ne Islam qubool kiya. Un ka malik Umayyah bin Khalaf is baat par bohat naraz hua aur unhein sakht garmi mein tapti ret par litakar un ke seene par bhari pathar rakh deta, taake woh Islam chhor dein.

Magar Hazrat Bilal (RA) is takleef mein bhi bas ek hi baat kehte rehte: "Ahad, Ahad" (Allah ek hai, Allah ek hai) — woh apne imaan par date rahe.

Hazrat Abu Bakr (RA) ne yeh haal dekha to unhein khareed kar azad kar diya. Baad mein jab Madina mein pehli azan dene ki baat aayi, to Nabi Kareem ﷺ ne Hazrat Bilal (RA) ko yeh aizaz bakhsha — woh Islam ke pehle muazzin bane.

Sabaq: Jo log mushkil waqt mein bhi apne imaan par sabit qadam rehte hain, Allah unhein izzat se nawazta hai.`},
  {t:{en:`Prophet Sulaiman (AS) and the Ant`, ro:`Hazrat Sulaiman (AS) aur Cheenti`}, ref:`An-Naml 27:18–19`,
   en:`Allah gave Prophet Sulaiman (AS) special powers — he could understand the speech of birds and animals, and he had a huge army made up of humans, jinn and birds.

One day this army was passing through a valley where ants lived. One ant called out to the others: "O ants! Go into your homes, lest Sulaiman and his army crush you without realising it."

Sulaiman (AS) heard this and smiled. He immediately halted the army so that no ant would be harmed. Then he thanked Allah for the blessings He had given him.

Lesson: Every creature of Allah — however small — matters, and we should be kind to all living things.`,
   ro:`Hazrat Sulaiman (AS) ko Allah Ta'ala ne khaas taqat di thi — woh parindon aur janwaron ki baat samajh sakte thay, aur un ka ek bohat bara lashkar tha jis mein insaan, jinn aur parinde shamil thay.

Ek din yeh lashkar ek wadi se guzar raha tha jahan cheentiyan rehti thin. Ek cheenti ne baaqi cheentiyon ko awaz di: "Aye cheentiyo! Apne bilon mein chali jao, kahin Sulaiman aur un ka lashkar anjaane mein tumhein kuchal na de."

Hazrat Sulaiman (AS) ne yeh baat sun li aur muskura diye. Unhon ne foran lashkar ko rok diya taake cheentiyon ko koi nuqsan na pohnche. Phir unhon ne Allah ka shukar ada kiya ke us ne unhein aisi nemtein ata farmayin.

Sabaq: Allah ki har makhlooq — chahe woh kitni hi chhoti kyun na ho — ahem hai, aur humein sab jandaron par rehm karna chahiye.`}
];
