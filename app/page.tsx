'use client';
import Header from "../components/header";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface StudentData {
  rgm: string;
  name: string;
  course: string;
  status: string;
}

export default function Home() {
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScannerRunningRef = useRef<boolean>(false);

  const parseQRData = (rawData: string): StudentData | null => {
    try {
      const parsed = JSON.parse(rawData);
      return {
        rgm: parsed.rgm || '',
        name: parsed.name || '',
        course: parsed.course || '',
        status: parsed.status || '',
      };
    } catch {
      const parts = rawData.split('|');
      if (parts.length === 4) {
        return {
          rgm: parts[0].trim(),
          name: parts[1].trim(),
          course: parts[2].trim(),
          status: parts[3].trim(),
        };
      }
    }
    return null;
  };

  const onScanSuccess = (decodedText: string) => {
    setQrResult(decodedText);
    const parsed = parseQRData(decodedText);
    setStudentData(parsed);

    if (scannerRef.current && isScannerRunningRef.current) {
      scannerRef.current.stop().catch(() => {
      });
      isScannerRunningRef.current = false;
    }
  };

  const onScanError = () => {
  };

  const startScanner = async () => {
    if (!scannerRef.current || isScannerRunningRef.current) {
      return;
    }

    try {
      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 280, height: 280 },
          aspectRatio: 1.0,
        },
        onScanSuccess,
        onScanError
      );
      isScannerRunningRef.current = true;
    } catch (error) {
      console.warn('Erro ao iniciar câmera traseira:', error);
      isScannerRunningRef.current = false;
    }
  };

  const handleRescan = async () => {
    setQrResult(null);
    setStudentData(null);

    setTimeout(() => {
      startScanner();
    }, 100);
  };

  useEffect(() => {
    const scanner = new Html5Qrcode('qr-reader');
    scannerRef.current = scanner;

    startScanner();

    return () => {
      if (scannerRef.current && isScannerRunningRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current?.clear();
            isScannerRunningRef.current = false;
          })
          .catch(() => {
            scannerRef.current?.clear();
            isScannerRunningRef.current = false;
          });
      }
    };
  }, []);
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <main className="flex flex-col items-center justify-center  text-white px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-3">Validação de Sócios</h1>
        <p className="text-center text-gray-400 text-sm mb-10 leading-relaxed">
          Escaneie o QR Code da carteirinha para conferir a<br />situação do sócio.
        </p>

        <div className="mb-6">
          <div className="text-5xl text-green-400 animate-bounce">↓</div>
        </div>

        {!qrResult ? (
          <div className="w-full max-w-md">
            <div className="border-2 border-dashed border-green-500 rounded-3xl p-6 bg-white/5 backdrop-blur-sm">
              <div
                id="qr-reader"
                className="rounded-3xl overflow-hidden bg-black/80"
                style={{ aspectRatio: '1' }}
              />
            </div>

            <p className="text-center text-gray-400 text-xs mt-5 flex items-center justify-center gap-2">
              Aponte para o QR Code da carteirinha
            </p>
          </div>
        ) : studentData ? (
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-green-500/50 bg-green-900/30 p-6">
              <h2 className="text-2xl font-bold text-green-300 mb-6 text-center">✓ Sócio Validado!</h2>

              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide">RGM</p>
                <p className="text-lg font-semibold text-green-200 bg-black/50 p-3 rounded-lg border border-green-500/30">{studentData.rgm}</p>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Nome</p>
                <p className="text-lg font-semibold text-green-200 bg-black/50 p-3 rounded-lg border border-green-500/30">{studentData.name}</p>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Curso</p>
                <p className="text-lg font-semibold text-green-200 bg-black/50 p-3 rounded-lg border border-green-500/30">{studentData.course}</p>
              </div>

              <div className="mb-6">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Situação</p>
                <p className={`text-lg font-semibold p-3 rounded-lg border ${studentData.status.toLowerCase() === 'ativo' ? 'text-green-200 bg-green-900/50 border-green-500/50' : 'text-red-200 bg-red-900/50 border-red-500/50'}`}>{studentData.status}</p>
              </div>

              <button onClick={handleRescan} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                Escanear Outro QR Code
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-red-500/50 bg-red-900/30 p-6 text-center">
              <h2 className="text-2xl font-bold text-red-300 mb-4">⚠ QR Code Inválido</h2>
              <p className="text-red-200 text-sm mb-6">O QR code não contém os dados esperados.</p>
              <button onClick={handleRescan} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition-colors">
                Tentar Novamente
              </button>
            </div>
          </div>
        )}
      </main>

      <BottomNavigationBar />
    </div>
  );
}
