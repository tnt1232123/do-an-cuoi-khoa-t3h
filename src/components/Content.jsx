import { TextField, Button, Grid, TextareaAutosize } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core';
import firebase from '../firebase';
import { Input } from 'antd';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '2rem',
        margin: 'auto',
        backgroundImage: ''
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        backgroundColor: 'white',
    },
    content: {
        margin: 'auto',
        maxHeight: '100%',
        maxWidth: '60%',
        border: 'dashed 3px black',
        borderRadius: '20px',
        backgroundImage: 'linear-gradient(to right bottom, #2057FF, #7BFFC8)'

    },
    input: {
        display: 'flex',
        margin: 'auto',
        maxWidth: '90%',
        marginTop: '2rem'
    },
    inputPlace: {
        maxHeight: '500px',
        display: 'block',
        fontSize: '1.5rem',
        width: '100%',
        marginBottom: '1rem',
        padding: '1rem',

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
        marginLeft: '40%',
        height: '4rem',
        marginBottom: '2rem',
        marginTop: '1rem'
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


export default function Content() {

    const classes = useStyles();
    const [input, setInput] = useState('');
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [showInput, setShowInput] = useState(true)


    const handleClickAddData = () => {
        console.log('push data len firebase');
        let fireStore = firebase.database().ref(`/User${firebase.auth().currentUser.uid}`);
        let data = {
            input,
            date,
            title,
        };
        if (input === '') {
            alert("Vui lòng thêm nội dung!!!")
        }
        if (date === '') {
            alert("Vui lòng chọn ngày!!!")
        }
        if (title === '') {
            alert("Vui lòng thêm tiêu đề!!!")
        }
        if (input !== '' && date !== '' && title !== '') {
            try {
                fireStore.push(data);
                console.log('push success!');
                setDate(null)
                setInput('')
                setTitle('')
                setShowInput(!showInput)
                window.location.href = "/"
            } catch (error) {
                console.log("error", error);
            }
        }
    }
    const [dataList, setDataList] = useState([]);

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
    console.log('dataList', dataList);

    return (
        <React.Fragment>
            <div className={classes.content}>
                <form className={classes.container} noValidate>
                    <TextField
                        style={{ marginLeft: '40%', width: '20%' }}

                        label={<span style={{ fontSize: '1.5rem', color: 'black', fontWeight: '200', }}>Chọn ngày</span>}
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => { setDate(e.target.value) }}
                    />
                </form>
                <Input
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                    className={classes.inputTitlecss}
                    placeholder='Tiêu đề'
                    size="large"
                ></Input>
                <Grid className={classes.input}>
                    <TextareaAutosize
                        minRows={10}
                        className={classes.inputPlace}
                        aria-label="maximum height"
                        placeholder="Hãy nhập nội dung !!"
                        defaultValue=""
                        onChange={(e) => { setInput(e.target.value) }}
                        value={input}
                    />
                </Grid>
                {/* button push data to firebase */}
                <Button variant="contained"
                    className={classes.widthButtonSubmit}
                    color="primary"
                    size="large"
                    onClick={handleClickAddData}
                >Submit</Button>
            </div>
        </React.Fragment>
    )
}
