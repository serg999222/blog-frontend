import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { selectIsAuth } from '../../redux/slises/auth'
import 'easymde/dist/easymde.min.css';
import { useDispatch, useSelector } from 'react-redux'
import styles from './AddPost.module.scss';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from '../../axios'

export const AddPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)
  const [isLoading, setIsLoading] = React.useState(false)
  const [text, setText] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [tags, setTags] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState('')
  const inputFileRef = React.useRef(null)
  const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('/upload', formData)
      setImageUrl(data.url)
    } catch (e) {
      console.warn(e)
      alert('Помилка при завантаженні зображення')
    }
  };

  const onClickRemoveImage = () => { };

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const fields = {
        title,
        imageUrl,
        tags,
        text
      }
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields)
      const _id = isEditing ? id : data._id
      navigate(`/posts/${_id}`)
    } catch (e) {
      console.warn(e)
      alert('Помилка при завантаженні статті')
    }
  }

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then((data) => {
        setTitle(data.data.title)
        setText(data.data.text)
        setImageUrl(data.data.imageUrl)
        setTags(data.data.tags.join(','))
      }).catch(err => {
        console.warn(err)
        alert('error')
      })
    }
  }, [])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введіть текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Завантажити зображення
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Видалити
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статті..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }} variant="standard" placeholder="Теги" fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Зберегти' : 'Опублікувати'}
        </Button>
        <a href="/">
          <Button size="large">Відміна</Button>
        </a>
      </div>
    </Paper>
  );
};
