import clsx from 'clsx'
import React from 'react'
import { BsX } from 'react-icons/bs'

export default function PreviewOnDropFile({
  onDrop,
  closeOnPreview
}) {
  return (
    <div className="relative flex h-full max-h-[100vh_-_120px] flex-1 flex-col overflow-auto p-2 pt-8">
      <div className="flex h-full flex-1 items-center justify-center overflow-hidden p-2">
        <img src='/images/vector.png' className='max-h-full object-contain' />
      </div>
      <div className='mt-auto flex gap-1 overflow-auto'>
        {Array.from({ length: 5 }).map((number) => (
          <div key={number} className="group relative">
            <button
              className={clsx(
                "flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 bg-secondary transition-all hover:border-primary focus:border-primary",
                true
                  ? "border-primary"
                  : "border-transparent",
              )}
              onClick={() => { }}
            >
              <img
                src='/images/vector.png'
                alt=""
                className="max-h-full object-cover"
              />
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
