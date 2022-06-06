
export const fileUpload = async ( file: string ) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/ds4lp5etl/upload';

  const formData = new FormData();

  formData.append('upload_preset', 'journalApp')
  formData.append('file', file)
  
  const resp = await fetch( cloudUrl, {
    method: 'POST',
    body: formData
  })

  if (resp.ok) {
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } else {
    throw await resp.json()
  }
}