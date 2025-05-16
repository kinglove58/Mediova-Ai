import Configuration from '@/components/image-generation/Configuration'
import React from 'react'

const ImageGenerationPage = () => {
  return (
    <section className='grid grid-cols-3 gap-4 container mx-auto overflow-hidden'>
      <Configuration/>
      <div>output</div>
    </section>
  )
}

export default ImageGenerationPage