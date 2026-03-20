import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { useDropzone } from 'react-dropzone'
import { X, Upload, Check } from 'lucide-react'

export default function PhotoUploader({ onSave, onClose }) {
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onDrop = useCallback((files) => {
    const file = files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageSrc(reader.result)
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    multiple: false,
  })

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const handleSave = async () => {
    if (!croppedAreaPixels || !imageSrc) return
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels)
    onSave(cropped)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Upload Foto</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {!imageSrc ? (
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-10 text-center cursor-pointer transition-colors"
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto text-slate-400 mb-3" size={32} />
              <p className="text-slate-500 text-sm">Klik atau drag foto di sini</p>
              <p className="text-slate-400 text-xs mt-1">JPG, PNG, WEBP</p>
            </div>
          ) : (
            <>
              <div className="relative h-64 rounded-xl overflow-hidden bg-slate-100">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="mt-4">
                <label className="text-xs text-slate-500 block mb-1">Zoom</label>
                <input
                  type="range" min={1} max={3} step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setImageSrc(null)}
                  className="flex-1 border border-slate-200 text-slate-600 rounded-xl py-2.5 text-sm hover:bg-slate-50"
                >
                  Ganti Foto
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Check size={16} /> Simpan Foto
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc)
  const OUTPUT_SIZE = 640
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = OUTPUT_SIZE
  canvas.height = OUTPUT_SIZE
  ctx.drawImage(
    image,
    pixelCrop.x, pixelCrop.y,
    pixelCrop.width, pixelCrop.height,
    0, 0,
    OUTPUT_SIZE, OUTPUT_SIZE
  )
  return canvas.toDataURL('image/jpeg', 0.92)
}

function createImage(url) {
  return new Promise((res, rej) => {
    const img = new Image()
    img.addEventListener('load', () => res(img))
    img.addEventListener('error', rej)
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = url
  })
}
