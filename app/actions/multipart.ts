const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs'); // لقراءة ملف الصورة من النظام

// إعداد البيانات
const form = new FormData();
form.append('image', fs.createReadStream('/path/to/your/image/model.jpg')); // استبدل المسار بمسار الصورة على جهازك

// إعداد الطلب
axios.post('https://api.vyro.ai/v2/image/enhance', form, {
  headers: {
    'Authorization': 'Bearer vk-ad08a8e86d1a84404e5837be47d39ab44474f982671c0a',
    ...form.getHeaders() // إضافة رؤوس multipart/form-data الضرورية
  }
})
  .then(response => {
    console.log('نجاح الطلب:', response.data);
  })
  .catch(error => {
    console.error('خطأ في الطلب:', error.response ? error.response.data : error.message);
  });