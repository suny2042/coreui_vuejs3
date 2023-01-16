/**
 * http://usejsdoc.org/
 */
'use strict'
import axios from 'axios'
//     （         ）
export async function downloadFile(fileUrl, fileName) {
  if (!fileUrl) return
  let res = await axios({
    method: 'get',
    url: fileUrl,
    responseType: 'blob',
  })
  let newUrl = window.URL.createObjectURL(res.data)
  let a = document.createElement('a')
  a.href = newUrl
  a.download = fileName
  a.click()
  a.remove()
  //               createObjectURL
  window.URL.revokeObjectURL(newUrl)
}
