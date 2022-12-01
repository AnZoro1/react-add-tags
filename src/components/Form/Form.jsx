import React, { useState } from 'react'

import styles from './Form.module.css'

const Form = () => {
  const [text, setText] = useState('') // состояние текста
  const [tag, setTag] = useState([]) // состояние массива
  const [sended, setSended] = useState(false) // состояние отправлено или нет
  const [blur, setBlur] = useState(false)

  const handleText = (e) => {
    setText(e.target.value) // функция добавляющая текст в инпут, добавлят value
  }
  const submitInputValue = (e) => {
    e.preventDefault() //функция отправки текста
    console.log(text)
    setSended(true) // меняет состояние sended на true
    setBlur(false)
    setText('')
  }

  const addTags = () => {
    setTag([
      ...tag,
      {
        name: text,
      },
    ]) // добавляет новый объект в массив
  }
  const handleDelete = (i) => {
    const delTag = tag.filter((item, index) => {
      if (index === i) {
        return false
      }
      return true
    })
    setTag(delTag) // удаляет тег через филтер
  }
  const handleBlur = () => {
    setBlur(true)
  }

  const doMap = tag.map((elem, index) => {
    // мапит элементы и добавляет в константу doMap теги и кнопку удалить
    if (elem.name) {
      return (
        <div className={styles.itemsDiv1}>
          {elem.name}{' '}
          <div className={styles.buttonTagDiv}>
            <button
              className={styles.tagButton}
              onClick={() => handleDelete(index)} // вызывается функция удалить тег при нажатии на кнопку
            >
              x{' '}
            </button>
          </div>
        </div>
      )
    }
  })
  return (
    <div className={styles.mainDiv}>
      <form action="" className={styles.form} onSubmit={submitInputValue}>
        <input
          type="text"
          className={
            (!blur && !text) || text ? styles.input : styles.boxShadowForInput
          } // при отправке вызывается функция submitInpVal, а когда печатаешь вызывется handleText
          value={text}
          onChange={handleText} // при изменении инпута вызывает handleText, который обновляет через settext text передавая в текст value, ниже при клике на button вызывается addTags, который добавляет новый тег и копируемый объект в состояние tag
          onBlur={handleBlur}
        />
        <button onClick={addTags} disabled={!text}>
          отправить
        </button>
      </form>
      <div>
        {!text && blur ? (
          <div className={styles.inputEmpty}>
            Поле ввода не должно быть пустым
          </div>
        ) : null}
      </div>

      <div className={styles.itemsDiv2}> {sended ? doMap : null}</div>
    </div> // выводит doMap это 66строка, если sended становится true
  )
}

export default Form
