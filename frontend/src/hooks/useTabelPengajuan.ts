import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export interface Pengajuan {
  id: number;
  namaLengkap: string;
  tipePengajuan: string;
  nominalPengajuan: number;
  tenor: number;
  tagihan: number;
  pendapatanBulanan: number;
  createdAt: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | string;
  catatan?: string;
}

export function useDaftarPengajuan(refreshTrigger: number) {
  const [data, setData] = useState<Pengajuan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [detailModal, setDetailModal] = useState<Pengajuan | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ id: number; action: 'APPROVED' | 'REJECTED' } | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/pengajuan');
      setData(res.data.data);
    } catch (e) {
      console.error('Gagal mengambil data:', e);
      toast.error('Gagal mengambil data dari server.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTrigger]);

  const handleUpdateStatus = async () => {
    if (!confirmModal) return;
    
    const toastId = toast.loading('Memperbarui status...');
    try {
      await axios.patch(`http://localhost:5000/api/pengajuan/${confirmModal.id}/status`, { 
        status: confirmModal.action 
      });
      
      toast.success('Status berhasil diperbarui!', { id: toastId });
      setConfirmModal(null);
      fetchData(); // Refresh data setelah update
    } catch (e) {
      console.error(e);
      toast.error('Gagal mengubah status pengajuan', { id: toastId });
    }
  };

  const counts = {
    ALL: data.length,
    PENDING: data.filter(d => d.status === 'PENDING').length,
    APPROVED: data.filter(d => d.status === 'APPROVED').length,
    REJECTED: data.filter(d => d.status === 'REJECTED').length,
  };

  const filtered = filterStatus === 'ALL' ? data : data.filter(d => d.status === filterStatus);

  return {
    data,
    isLoading,
    filterStatus,
    setFilterStatus,
    detailModal,
    setDetailModal,
    confirmModal,
    setConfirmModal,
    fetchData,
    handleUpdateStatus,
    counts,
    filtered
  };
}