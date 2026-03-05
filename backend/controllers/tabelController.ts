import { Request, Response } from 'express';


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});


export const getAllPengajuan = async (req: Request, res: Response) => {
  try {
    const pengajuanList = await prisma.pengajuan.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
    });

    return res.status(200).json({
      message: "Berhasil mengambil data pengajuan",
      data: pengajuanList,
    });
  } catch (error) {
    console.error("Error getAllPengajuan:", error);
    return res.status(500).json({ 
      message: "Terjadi kesalahan pada server saat mengambil data" 
    });
  }
};

//  Halaman Detail
export const getPengajuanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const pengajuan = await prisma.pengajuan.findUnique({
      where: { 
        id: Number(id)
      },
    });

    if (!pengajuan) {
      return res.status(404).json({ 
        message: "Data pengajuan tidak ditemukan" 
      });
    }

    return res.status(200).json({
      message: "Berhasil mengambil detail pengajuan",
      data: pengajuan,
    });
  } catch (error) {
    console.error("Error getPengajuanById:", error);
    return res.status(500).json({ 
      message: "Terjadi kesalahan pada server saat mengambil detail" 
    });
  }
};


// Mengubah Status Pengajuan (Approve / Reject)
export const updateStatusPengajuan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validasi input status 
    if (!status || (status !== 'APPROVED' && status !== 'REJECTED')) {
      return res.status(400).json({ 
        message: "Status tidak valid. Harus 'APPROVED' atau 'REJECTED'." 
      });
    }


    const updatedPengajuan = await prisma.pengajuan.update({
      where: { 
        id: Number(id) 
      },
      data: { 
        status: status 
      }
    });

    return res.status(200).json({
      message: `Status pengajuan berhasil diubah menjadi ${status}`,
      data: updatedPengajuan,
    });

  } catch (error: any) {
    console.error("Error updateStatusPengajuan:", error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        message: "Data pengajuan tidak ditemukan" 
      });
    }

    return res.status(500).json({ 
      message: "Terjadi kesalahan pada server saat mengubah status" 
    });
  }
};