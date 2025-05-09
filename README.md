# OtoRehber – Otomobil Bilgi Sistemi

**Geliştirici:** Emirhan SÖBÜOĞLU  
**Bölüm:** Bilişim Sistemleri Mühendisliği, Kocaeli Üniversitesi  
**İletişim:** emirsbgl@gmail.com

## 📌 Proje Özeti

OtoRehber, araçların motor ve donanım bilgilerini kullanıcıya sunmayı amaçlayan web tabanlı bir bilgilendirme ve yönetim sistemidir. Next.js kullanılarak geliştirilen bu uygulama, MongoDB Atlas veritabanı, Firebase Storage görsel depolama ve AWS Amplify dağıtımıyla bulut tabanlı olarak çalışmaktadır. Admin girişi NextAuth.js ile güvenli hale getirilmiştir.

## 🔑 Anahtar Kelimeler

Next.js, AWS Amplify, MongoDB Atlas, Firebase Storage, NextAuth.js, Web Uygulaması, Bulut Bilişim

## 🔗 Proje Yayın Linki

> [[Proje Linki](https://main.d3tiehxau2yotb.amplifyapp.com/)]

---

## 1. Proje Tanıtımı ve Literatür Taraması

Araç platformlarının çoğu ilan temelli çalışmakta ve detaylı teknik bilgi sunmamaktadır. OtoRehber, bu eksikliği kapatmayı hedefleyen bilgi odaklı bir platformdur.

## 2. Problem Tanımı

Eski araç modellerine ait motor ve donanım bilgileri dağınık ve eksik kaynaklarda bulunmakta; kullanıcıların bilinçli karar vermesi zorlaşmaktadır.

## 3. Çözüm ve Süreç

- Kullanıcı arayüzü oluşturuldu
- MongoDB veritabanı modellendi
- Firebase ile görseller entegre edildi
- NextAuth.js ile admin kontrolü sağlandı
- AWS Amplify ile dağıtım yapıldı

## 4. Yenilik ve Katkılar

- Satış içermeyen sadece bilgi sunan yapı
- Eski araçlara özel detaylı veri modeli
- Basit arayüz ve admin güvenliği

## 5. Bilimsel Yaklaşım

Next.js SSR kullanılarak SEO ve performans avantajı sağlandı. NoSQL veriler Prisma ORM ile modellendi.

## 6. Materyal, Metot ve Mimari

- **Materyaller:** Next.js, MongoDB Atlas, Firebase Storage, AWS Amplify, NextAuth.js  
- **Metot:** REST, SSR, role-based access  
- **Mimari:** Frontend → API → ORM → MongoDB | Görseller → Firebase → Frontend

## 7. Önerilen Yöntem

- Varlık-İlişki Diyagramı (ERD)
- Uygulama Akış Diyagramı (Flowchart)

## 8. Deneysel Sonuçlar

- Sayfa yüklenme süresi: 0.8 – 1.4 sn  
- Firebase görseller: sorunsuz  
- Admin yetki kontrolü: aktif  
- Mobil uyumluluk: %90

## 9. Sonuç ve Tartışma

Proje, bilgi sunma odaklı olmasıyla benzerlerinden ayrılır. Kullanılan teknolojiler sayesinde ölçeklenebilir, sürdürülebilir ve geliştirilmeye açık bir yapıya sahiptir.

## 10. Zorluklar ve Kazanımlar

**Zorluklar:**  
- SSR ortam değişkenleri problemi  
- Prisma derleme hataları  
- .env.production geçici çözümü  

**Kazanımlar:**  
- AWS üzerinde gerçek deploy deneyimi  
- SSR ve kimlik doğrulama uygulama pratiği  
- Bulut mimari tecrübesi

## 11. Kaynaklar

1. [Next.js](https://nextjs.org/docs)  
2. [AWS Amplify](https://docs.amplify.aws)  
3. [MongoDB Atlas](https://www.mongodb.com/docs/atlas)  
4. [Firebase Storage](https://firebase.google.com/docs/storage)  
5. [Prisma ORM](https://www.prisma.io/docs)  
6. [NextAuth.js](https://next-auth.js.org/getting-started/introduction)  
7. [React](https://reactjs.org/docs)  
8. [Edmunds Vehicle Specs](https://www.edmunds.com/specs/)
