import { Request, Response } from 'express';


import { PrismaClient, StatusPengajuan } from "@prisma/client";

const prisma = new PrismaClient({});

export const createPengajuan = async (req: Request, res: Response) => {
  try {
    const { 
      namaLengkap, 
      tipePengajuan, 
      nominalPengajuan, 
      tenor, 
      pendapatanBulanan, 
      catatan 
    } = req.body;

    // Validasi Input 
    if (!namaLengkap || !tipePengajuan || !nominalPengajuan || !tenor || !pendapatanBulanan) {
      return res.status(400).json({ message: "Semua field wajib diisi." });
    }

    // Pendapatan minimal 1 Juta
    if (pendapatanBulanan < 1000000) {
      return res.status(400).json({ 
        message: "Nasabah belum dapat mengajukan pinjaman" 
      });
    }

    // Nominal maksimal 200 Juta
    if (nominalPengajuan > 200000000) {
      return res.status(400).json({ 
        message: "Nominal maksimal pinjaman yang dapat disetujui adalah 200 juta." 
      }); 
    }

    // Tenor maksimal 24 bulan
    if (tenor > 24) {
      return res.status(400).json({ 
        message: "Tenor pinjaman tertinggi adalah 24 bulan." 
      }); 
    }

    // Maksimal pengajuan 3 kali per nasabah
    const jumlahPengajuan = await prisma.pengajuan.count({
      where: { namaLengkap: namaLengkap }
    });

    if (jumlahPengajuan >= 3) {
      return res.status(400).json({ 
        message: "Maksimal pengajuan nasabah adalah sebanyak 3 kali." 
      }); 
    }

    //  Kalkulasi Tagihan Per Bulan
    const tagihan = Math.round(nominalPengajuan / tenor);

    // 7. Simpan ke Database
    const pengajuanBaru = await prisma.pengajuan.create({
      data: {
        namaLengkap,
        tipePengajuan,
        nominalPengajuan,
        tenor,
        pendapatanBulanan,
        catatan,
        tagihan,
        status: StatusPengajuan.PENDING // default awal PENDING
      }
    });

    return res.status(201).json({
      message: "Pengajuan berhasil dibuat",
      data: pengajuanBaru
    });

  } catch (error) {
    console.error("Error createPengajuan:", error);
    return res.status(500).json({ 
      message: "Terjadi kesalahan pada server" 
    });
  }
};


