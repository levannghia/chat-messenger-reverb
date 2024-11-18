import { formatFileSize, isImageLinkValid } from '@/utils'
import clsx from 'clsx'
import React from 'react'
import { BsFileEarmarkText, BsX } from 'react-icons/bs'

export default function PreviewOnDropFile({
  onDrop,
  closeOnPreview,
  selectedPreview,
  setSelectedPreview,
  attachments,
  setAttachments,
}) {
  return onDrop && (
    <div className="relative flex h-full max-h-[100vh_-_120px] flex-1 flex-col overflow-auto p-2 pt-8">
      <div className="flex h-full flex-1 items-center justify-center overflow-hidden p-2">
        {isImageLinkValid(selectedPreview.name) ? (
          <img src={selectedPreview.preview} className='max-h-full object-contain' />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <BsFileEarmarkText className="text-3xl" />
            </div>
            <div className="text-center">
              <h5 className="font-medium">{selectedPreview.name}</h5>
              <span className="text-xs">
                {formatFileSize(selectedPreview.size)}
              </span>
            </div>
          </div>
        )}

      </div>
      <div className='mt-auto flex gap-1 overflow-auto'>
        {attachments.map((file, index) => (
          <div key={`${file.name}-${index}`} className="group relative">
            <button
              className={clsx(
                "flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 bg-secondary transition-all hover:border-primary focus:border-primary",
                true
                  ? "border-primary"
                  : "border-transparent",
              )}
              onClick={() => { }}
            >
              {isImageLinkValid(file.name) ? (
                <img
                  src={file.preview}
                  alt=""
                  className="max-h-full object-cover"
                />
              ) : (
                <span className='flex h-[56px] w-[56px] shrink-0 items-center justify-center'>
                  <BsFileEarmarkText className='text-3xl' />
                </span>
              )}
            </button>
            <button
              className="absolute right-1 top-1 z-10 hidden h-4 w-4 items-center justify-center rounded-full bg-danger text-white group-hover:flex"
              onClick={() => { }}
            >
              <BsX />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
