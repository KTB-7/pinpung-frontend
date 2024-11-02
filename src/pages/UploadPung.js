import React, { useState } from 'react';
import ImageUpload from '../components/Upload/ImageUpload';
import TagInput from '../components/Upload/TagInput';
import LocationSelect from '../components/Upload/LocationSelect';
import TextArea from '../components/Upload/TextArea';
import { uploadPung } from '../api/uploadApi';

const UploadPung = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState(null);
};

export default UploadPung;
