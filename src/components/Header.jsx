import { Card, CardActions, CardContent, Grid, Input, makeStyles, TextareaAutosize, TextField } from '@material-ui/core'
import { Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import firebase from '../firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme) => ({

  title: {
    fontFamily: 'aria',
    fontSize: '1.5rem',
    textAlign: 'center'
  },
  buttonShow: {
    width: '30%',
    height: '3rem',
    marginLeft: '29%',
    marginRight: '0',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '0',
    borderRadius: '1rem',
    marginTop: '3rem'
  },
  buttonDelete: {
    width: '10%',
    margin: '0',
    padding: '0',
    borderRadius: '1rem',
    marginTop: '3rem',
    height: '3rem',
  },
  containerCard: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '2rem',
    marginTop: '2rem',
    width: '80%',
    margin: 'auto'
  },
  rootCard: {
    border: 'solid 1px black',
    marginBottom: '1rem',
    width: '100%',
    backgroundImage: 'linear-gradient(to right bottom, #2057FF, #7BFFC8)',
    height: 'auto',
    height: '15rem'
  },
  container: {
    width: '80%',
    margin: 'auto',
  },
  date: {
    textAlign: 'center',
    fontFamily: 'aria',
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  container: {
    marginTop: '2rem',
    margin: 'auto',
    position: 'relative'
  },
  buttonTop: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    width: '5rem',
    height: '5rem',
    fontWeight: '400',
    borderRadius: '50%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    backgroundColor: 'white'
  },
  content: {
    margin: 'auto',
    maxHeight: '100%',
    maxWidth: '60%',
    border: 'dashed 3px black',
    borderRadius: '20px'
  },
  input: {
    display: 'flex',
    margin: 'auto',
    maxWidth: '90%',
    marginTop: '2rem'
  },
  inputPlace: {
    height: 'auto',
    display: 'block',
    fontSize: '1.5rem',
    width: '100%',
    marginBottom: '1rem',
    padding: '1rem'
  },
  widthButton: {
    marginLeft: '2%',
    width: '10%',
    height: '3rem',
    marginBottom: '2rem',
    marginTop: '1rem'
  },
  widthButtonSubmit: {
    width: '20%',
    marginLeft: '25%',
    height: '4rem',
    marginBottom: '2rem',
    marginTop: '1rem',
    fontSize: '1.5rem',
    borderRadius: '1rem'
  },
  widthButtonCancel: {
    width: '20%',
    height: '4rem',
    marginBottom: '2rem',
    marginTop: '1rem',
    marginLeft: '10%',
    fontSize: '1.5rem',
    borderRadius: '1rem'
  },
  inputTitlecss: {
    width: '50%',
    height: '3rem',
    marginLeft: '25%',
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '0.5rem',
    border: '1px solid black'
  },

}));




export default function Header() {
  const classes = useStyles();

  const [dataList, setDataList] = useState(firebase.database().ref(`/User${firebase.auth().currentUser.uid}`));

  //Show detail and Edit
  const [showEdit, setShowEdit] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editDate, setEditDate] = useState('')
  const [updateUserId, setUpdateUserId] = useState(null)
  const [editInput, setEditInput] = useState('')

  useEffect(() => {
    // get list data here
    const fireStore = firebase.database().ref(`/User${firebase.auth().currentUser.uid}`)
    fireStore.on('value', (res) => {
      const data = res.val();
      let userList = [];
      for (let id in data) {
        userList.push({
          id,
          title: data[id].title,
          date: data[id].date,
          input: data[id].input
        })
      }
      setDataList(userList);
    })
  }, [])

  const handleDelete = (user) => {
    const fireStore = firebase.database().ref(`/User${firebase.auth().currentUser.uid}`).child(user.id).remove();
  }

  const handleShowInput = (user) => {
    setEditTitle(user.title);
    setEditDate(user.date);
    setUpdateUserId(user.id);
    setEditInput(user.input)
    setShowEdit(true);

  }
  const handleClickUpdateData = () => {
    const fireStore = firebase.database().ref(`/User${firebase.auth().currentUser.uid}`);
    if (editInput === '') {
      alert("Vui lòng thêm nội dung!!!")
    }
    if (editDate === '') {
      alert("Vui lòng chọn ngày!!!")
    }
    if (editTitle === '') {
      alert("Vui lòng thêm tiêu đề!!!")
    }
    if (editInput !== '' && editDate !== '' && editTitle !== '') {
      fireStore.child(updateUserId).update({
        title: editTitle,
        input: editInput,
        date: editDate,
      })
      setEditTitle('');
      setEditDate('');
      setEditInput('');
      setShowEdit(false);
      setUpdateUserId(null);
    }
  }

  const handleCancelEdit = () => {
    setShowEdit(false)
  }
  const goTopButton = () => {
    
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
};
  
  return (
    <React.Fragment>
      {!showEdit ?
        <div className={classes.container}>
          {dataList && dataList.length > 0 &&
            <Grid className={classes.containerCard}>{dataList.map(el => (
              <Card className={classes.rootCard} item xs={12} md={6}>
                <CardContent>
                  <Typography className={classes.date} color="textSecondary" gutterBottom>
                    {el.date}
                  </Typography>
                  <Typography variant="h5" component="h2">
                  </Typography>
                  <Typography className={classes.title} color="textSecondary">
                    {el.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    className={classes.buttonShow}
                    onClick={() => handleShowInput(el)}
                  >Show Detail</Button>
                  <Button onClick={() => handleDelete(el)} className={classes.buttonDelete}>
                    <DeleteForeverIcon color={'error'} />
                  </Button>
                </CardActions>
              </Card>
            ))}
            </Grid>
          }
          <Button
            id="goTop"
            className={classes.buttonTop}
            onClick={goTopButton}
            size='small'>
            <ArrowUpwardIcon color={'primary'} />
          </Button>
        </div>
        :
        <div className={classes.content}>
          <form className={classes.container} noValidate>
            <TextField
              style={{ marginLeft: '40%', width: '20%' }}
              value={editDate}
              label={<span style={{ fontSize: '1.5rem', color: 'black', fontWeight: '200', textAlign: 'center' }}>Chọn ngày</span>}
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => { setEditDate(e.target.value) }}
            />
          </form>
          <Input
            value={editTitle}
            onChange={(e) => { setEditTitle(e.target.value) }}
            className={classes.inputTitlecss}
            placeholder='Tiêu đề'
            size="large"
          ></Input>
          <Grid className={classes.input}>
            <TextareaAutosize
              minRows={10}
              className={classes.inputPlace}
              aria-label="maximum height"
              placeholder="Hãy nhập gì đó !!"
              defaultValue=""
              onChange={(e) => { setEditInput(e.target.value) }}
              value={editInput}
            />
          </Grid>
          {/* button push data to firebase */}
          <Button variant="contained"
            className={classes.widthButtonSubmit}
            color="primary"
            size="large"
            onClick={handleClickUpdateData}
          >Update Change</Button>
          <Button variant="contained"
            className={classes.widthButtonCancel}
            color="primary"
            size="large"
            onClick={handleCancelEdit}
          >Back</Button>
        </div>
      }
    </React.Fragment>
  )
}
