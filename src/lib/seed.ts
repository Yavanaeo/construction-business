import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./db";
import { hash } from "bcryptjs";

async function seed() {
  console.log("🌱 Starting database seed...");

  // Hash password for admin user
  const passwordHash = await hash("admin123", 12);

  // Create admin user
  const adminResult = await db`
    INSERT INTO users (email, name, password_hash, role, email_verified)
    VALUES ('admin@linehouse.id', 'Admin LineHouse', ${passwordHash}, 'admin', NOW())
    ON CONFLICT (email) DO UPDATE SET password_hash = ${passwordHash}, role = 'admin'
    RETURNING id
  `;
  const adminId = adminResult[0]?.id;
  console.log(`✅ Admin user created/updated: ${adminId}`);

  // Create staff user
  const staffHash = await hash("staff123", 12);
  const staffResult = await db`
    INSERT INTO users (email, name, password_hash, role, email_verified)
    VALUES ('staff@linehouse.id', 'Staff LineHouse', ${staffHash}, 'staff', NOW())
    ON CONFLICT (email) DO UPDATE SET password_hash = ${staffHash}, role = 'staff'
    RETURNING id
  `;
  console.log(`✅ Staff user created/updated: ${staffResult[0]?.id}`);

  // Create customer user
  const customerHash = await hash("customer123", 12);
  const customerUserResult = await db`
    INSERT INTO users (email, name, password_hash, role, email_verified)
    VALUES ('customer@linehouse.id', 'Budi Santoso', ${customerHash}, 'customer', NOW())
    ON CONFLICT (email) DO UPDATE SET password_hash = ${customerHash}, role = 'customer'
    RETURNING id
  `;
  const customerUserId = customerUserResult[0]?.id;
  console.log(`✅ Customer user created/updated: ${customerUserId}`);

  // Create customer profile
  let customerId: string | undefined;
  if (customerUserId) {
    const customerProfileResult = await db`
      INSERT INTO customers (user_id, phone, address, city, province, postal_code, company_name)
      VALUES (${customerUserId}, '+62 812-3456-7890', 'Jl. Merdeka No. 123, RT 01/RW 02, Kel. Merdeka, Kec. Bandung Wetan', 'Bandung', 'Jawa Barat', '40115', 'PT Maju Jaya')
      ON CONFLICT (user_id) DO UPDATE SET phone = '+62 812-3456-7890', address = 'Jl. Merdeka No. 123, RT 01/RW 02, Kel. Merdeka, Kec. Bandung Wetan', city = 'Bandung', province = 'Jawa Barat', postal_code = '40115', company_name = 'PT Maju Jaya'
      RETURNING id
    `;
    customerId = customerProfileResult[0]?.id;
    console.log(`✅ Customer profile created/updated: ${customerId}`);
  }

  // Seed services
  const services = [
    {
      slug: "renovasi-rumah",
      number: "01",
      title: "Renovasi Rumah",
      description: "Menyegarkan ruang, memperbaiki fungsi, dan memberi kehidupan baru pada rumah yang sudah ada.",
      short_description: "Renovasi interior, eksterior, dan struktur untuk rumah yang lebih nyaman dan modern.",
      icon: "refresh",
      features: ["Perbaikan struktur", "Penataan ulang tata ruang", "Penggantian material usang", "Penyesuaian kebutuhan modern"],
      display_order: 1,
      is_active: true,
    },
    {
      slug: "bangun-rumah",
      number: "02",
      title: "Bangun Rumah",
      description: "Mewujudkan rumah dari perencanaan hingga pengerjaan dengan perhatian pada kualitas dan detail.",
      short_description: "Pembangunan rumah baru dari nol dengan manajemen proyek profesional.",
      icon: "home",
      features: ["Perencanaan arsitektur", "Manajemen konstruksi", "Pengawasan kualitas", "Serah terima bersertifikat"],
      display_order: 2,
      is_active: true,
    },
    {
      slug: "rekonstruksi",
      number: "03",
      title: "Rekonstruksi",
      description: "Menata ulang bangunan agar lebih sesuai dengan kebutuhan, kenyamanan, dan rencana jangka panjang.",
      short_description: "Perkuatan struktur, penambahan lantai, dan perubahan fungsi ruang.",
      icon: "rotate",
      features: ["Perkuatan struktur", "Penambahan lantai", "Perubahan fungsi ruang", "Modernisasi sistem"],
      display_order: 3,
      is_active: true,
    },
    {
      slug: "interior-eksterior",
      number: "04",
      title: "Interior & Eksterior",
      description: "Menyelaraskan bagian dalam dan luar rumah agar terasa utuh, nyaman, dan memiliki karakter.",
      short_description: "Desain interior custom, pemilihan material, pencahayaan, dan lanskap eksterior.",
      icon: "palette",
      features: ["Desain interior custom", "Pemilihan material", "Pencahayaan & ventilasi", "Lanskap & fasad eksterior"],
      display_order: 4,
      is_active: true,
    },
  ];

  for (const svc of services) {
    await db`
      INSERT INTO services (slug, number, title, description, short_description, icon, features, display_order, is_active)
      VALUES (${svc.slug}, ${svc.number}, ${svc.title}, ${svc.description}, ${svc.short_description}, ${svc.icon}, ${JSON.stringify(svc.features)}::jsonb, ${svc.display_order}, ${svc.is_active})
      ON CONFLICT (slug) DO UPDATE SET
        title = ${svc.title},
        description = ${svc.description},
        short_description = ${svc.short_description},
        icon = ${svc.icon},
        features = ${JSON.stringify(svc.features)}::jsonb,
        display_order = ${svc.display_order},
        is_active = ${svc.is_active},
        updated_at = NOW()
    `;
  }
  console.log(`✅ Services seeded: ${services.length}`);

  // Seed projects
  const projects = [
    {
      slug: "rumah-modern-minimalis",
      number: "01",
      type: "Arsitektur Hunian",
      title: "Rumah Modern Minimalis",
      location: "Bandung, Jawa Barat",
      year: "2024",
      area: "180 m²",
      category: "Bangun Rumah",
      image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
      alt_text: "Rumah modern dengan material natural dan bukaan lebar",
      description: "Rumah dua lantai dengan konsep open-plan, material alami kayu dan batu, serta bukaan kaca penuh menghadap taman. Desain mengutamakan alami cahaya dan sirkulasi udara, dengan atrium tengah yang menjadi jantung rumah.",
      short_description: "Rumah 2 lantai open-plan dengan material alami dan atrium tengah.",
      features: ["Struktur baja ringan prefabrikasi", "Dinding kayu alami & batu andesit", "Kaca lantai-langit (floor-to-ceiling)", "Taman atrium tengah dengan air feature", "Sistem smart home dasar", "Panel surya 5kWp"],
      challenges: "Lahan berbentuk segitiga memerlukan solusi struktural kreatif untuk memaksimalkan ruang habitable sambil mempertahankan estetika minimalis.",
      timeline: "6 bulan (Desain 1.5 bln, Konstruksi 4.5 bln)",
      display_order: 1,
      is_featured: true,
      is_active: true,
    },
    {
      slug: "renovasi-rumah-warisan",
      number: "02",
      type: "Renovasi Total",
      title: "Renovasi Rumah Warisan",
      location: "Subang, Jawa Barat",
      year: "2023",
      area: "120 m²",
      category: "Renovasi Rumah",
      image_url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      alt_text: "Interior ruang keluarga bernuansa hangat pasca renovasi",
      description: "Revitalisasi rumah lama menjaga karakter asli sambil memodernisasi tata ruang, sistem listrik, dan pipa. Dinding bata ekspos dipulihkan, lantai diganti kayu solid, dan bukaan diperluas untuk menghubungkan interior dengan halaman.",
      short_description: "Revitalisasi rumah warisan dengan mempertahankan karakter arsitektur kolonial.",
      features: ["Pertahankan struktur kayu & bata asli", "Buka ruang keluarga & dapur (open kitchen)", "Lantai kayu solid merbau", "Sistem listrik & pipa baru total", "Kamar mandi induk dengan walk-in shower", "Veranda depan diperluas"],
      challenges: "Struktur kayu usia 40+ tahun memerlukan perkuatan selectif tanpa mengubah karakter arsitektur kolonial.",
      timeline: "4 bulan (Desain 1 bln, Konstruksi 3 bln)",
      display_order: 2,
      is_featured: true,
      is_active: true,
    },
    {
      slug: "rekonstruksi-villa-tepi-sawah",
      number: "03",
      type: "Rekonstruksi",
      title: "Rekonstruksi Villa Tepi Sawah",
      location: "Cimahi, Jawa Barat",
      year: "2024",
      area: "250 m²",
      category: "Rekonstruksi",
      image_url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
      alt_text: "Detail interior villa dengan pemandangan sawah",
      description: "Perkuatan fondasi dan struktur, penambahan lantai dua, serta redesign total interior dan eksterior menghadap sawah. Konsep 'indoor-outdoor living' dengan bukaan penuh ke kolam renang dan pemandangan sawah.",
      short_description: "Villa dengan kolam infinity menghadap sawah, konsep indoor-outdoor living.",
      features: ["Perkuatan fondasi mikropile 12m", "Tambah lantai 2 (kamara tidur & ruang keluarga)", "Kolam renang infinity menghadap sawah", "Fasad kayu ulin & bata merah ekspos", "Sistem ventilasi silang alami", "Lanskap kering (xeriscaping)"],
      challenges: "Tanah lunak lahan sawah memerlukan fondasi dalam; konstruksi berlangsung di musim hujan.",
      timeline: "8 bulan (Desain 2 bln, Konstruksi 6 bln)",
      display_order: 3,
      is_featured: true,
      is_active: true,
    },
  ];

  for (const proj of projects) {
    await db`
      INSERT INTO projects (slug, number, type, title, location, year, area, category, image_url, alt_text, description, short_description, features, challenges, timeline, display_order, is_featured, is_active)
      VALUES (${proj.slug}, ${proj.number}, ${proj.type}, ${proj.title}, ${proj.location}, ${proj.year}, ${proj.area}, ${proj.category}, ${proj.image_url}, ${proj.alt_text}, ${proj.description}, ${proj.short_description}, ${JSON.stringify(proj.features)}::jsonb, ${proj.challenges}, ${proj.timeline}, ${proj.display_order}, ${proj.is_featured}, ${proj.is_active})
      ON CONFLICT (slug) DO UPDATE SET
        title = ${proj.title},
        description = ${proj.description},
        short_description = ${proj.short_description},
        features = ${JSON.stringify(proj.features)}::jsonb,
        challenges = ${proj.challenges},
        timeline = ${proj.timeline},
        display_order = ${proj.display_order},
        is_featured = ${proj.is_featured},
        is_active = ${proj.is_active},
        updated_at = NOW()
    `;
  }
  console.log(`✅ Projects seeded: ${projects.length}`);

  // Assign customer to projects
  if (customerId) {
    const projectSlugs = projects.map((p) => p.slug);
    for (const slug of projectSlugs) {
      const projectResult = await db`SELECT id FROM projects WHERE slug = ${slug}`;
      if (projectResult[0]?.id) {
        await db`
          INSERT INTO customer_projects (customer_id, project_id, role)
          VALUES (${customerId}, ${projectResult[0].id}, 'owner')
          ON CONFLICT (customer_id, project_id) DO UPDATE SET role = 'owner'
        `;
      }
    }
    console.log(`✅ Customer assigned to ${projectSlugs.length} projects`);
  }

  // Seed site settings
  await db`
    INSERT INTO site_settings (key, value, description)
    VALUES ('site_name', '"LineHouse"', 'Nama situs')
    ON CONFLICT (key) DO NOTHING
  `;

  await db`
    INSERT INTO site_settings (key, value, description)
    VALUES ('site_tagline', '"Konstruksi & Renovasi Premium"', 'Tagline situs')
    ON CONFLICT (key) DO NOTHING
  `;

  await db`
    INSERT INTO site_settings (key, value, description)
    VALUES ('whatsapp_number', '"+62 838-2967-7870"', 'Nomor WhatsApp untuk CTA')
    ON CONFLICT (key) DO NOTHING
  `;

  await db`
    INSERT INTO site_settings (key, value, description)
    VALUES ('instagram_handle', '"@linehouse.id"', 'Handle Instagram')
    ON CONFLICT (key) DO NOTHING
  `;

  await db`
    INSERT INTO site_settings (key, value, description)
    VALUES ('service_area', '"Jawa Barat, Indonesia"', 'Area layanan')
    ON CONFLICT (key) DO NOTHING
  `;

  console.log("✅ Site settings seeded");

  console.log("🎉 Seed completed successfully!");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}