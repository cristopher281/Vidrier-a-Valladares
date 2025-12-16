import React, { useEffect, useState, useRef } from 'react'
import { fileToBase64, compressImage } from '../../utils/storage'

export default function ProductForm({initial, onSave, onCancel}){
  const [form, setForm] = useState({name:'',price:0,stock:0,category:'Vidrio templado',description:'',img:''})
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef()

  useEffect(()=>{ if(initial) setForm(initial) },[initial])

  const handleFileObject = async (f) => {
    if(!f) return
    const b = await fileToBase64(f)
    const compressed = await compressImage(b,800)
    setForm(prev=>({...prev,img:compressed}))
  }

  const handleFile = async (e) => {
    const f = e.target.files && e.target.files[0]
    await handleFileObject(f)
  }

  const onDrop = async (e) => {
    e.preventDefault(); setDragOver(false)
    const f = e.dataTransfer.files && e.dataTransfer.files[0]
    await handleFileObject(f)
  }

  const submit = (e) => {
    e.preventDefault()
    // normalize numeric fields
    const payload = {...form, price: Number(form.price||0), stock: Number(form.stock||0)}
    onSave(payload)
  }

  return (
    <form onSubmit={submit} style={{display:'grid',gap:12}}>
      <div>
        <label className="form-label">Imagen</label>
        <div
          onDragOver={(e)=>{e.preventDefault(); setDragOver(true)}}
          onDragLeave={()=>setDragOver(false)}
          onDrop={onDrop}
          onClick={()=>fileInputRef.current && fileInputRef.current.click()}
          className="card"
          style={{border: `2px dashed ${dragOver? 'var(--accent)': 'rgba(255,255,255,0.06)'}`, padding:12, borderRadius:8, cursor:'pointer', display:'flex',alignItems:'center',gap:12}}
        >
          <div style={{flex:1,color:'var(--muted)'}}>{form.img? 'Haz clic o arrastra para reemplazar la imagen' : 'Arrastra una imagen aquí o haz clic para subir'}</div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} style={{display:'none'}} />
        </div>
        {form.img && <div style={{display:'flex',alignItems:'center',gap:12,marginTop:8}}>
          <img src={form.img} alt="preview" style={{width:160,borderRadius:8,boxShadow:'var(--card-shadow)'}} />
          <div style={{color:'var(--muted)'}}>Vista previa de la imagen seleccionada</div>
        </div>}
      </div>

      <div className="form-group floating">
        <input className="input" placeholder=" " value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <label className="form-label">Nombre</label>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <div className="form-group floating">
          <input className="input" type="number" placeholder=" " value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
          <label className="form-label">Precio</label>
        </div>
        <div className="form-group floating">
          <input className="input" type="number" placeholder=" " value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} />
          <label className="form-label">Stock</label>
        </div>
      </div>

      <div className="form-group floating">
        <input className="input" placeholder=" " value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
        <label className="form-label">Categoría</label>
      </div>

      <div className="form-group">
        <textarea className="textarea" placeholder=" " value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <label className="form-label">Descripción</label>
      </div>

      <div style={{display:'flex',gap:8}}>
        <button className="btn" type="submit">Guardar</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}
