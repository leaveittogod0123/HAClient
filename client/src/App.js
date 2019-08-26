import React, {Component} from 'react'
import {Button, ListGroup, Table} from 'react-bootstrap';
import Header from './Header.js'
import {Route, Link, withRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {stringify} from "query-string";


export class Home extends Component {
    render() {
        return (
            <div>
                <h1>홈 페이지</h1>
            </div>
        )
    }
}

export class First extends Component {
    render() {
        return (
            <div>
                <h2>1, 첫번째 페이지</h2>
            </div>
        )
    }
}

export class Second extends Component {
    render() {
        return (
            <div>
                <h3>2, 두번째 페이지</h3>
            </div>
        )
    }
}

export class Third extends Component {
    render() {
        return (
            <div>
                <Link to={`${this.props.match.url}/1`} style={{marginRight: '5px'}}>
                    1번
                </Link>
                <Link to={`${this.props.match.url}/2`}>2번</Link>
                <Route
                    exact
                    path={this.props.match.url}
                    render={() => (
                        <div>
                            <h3>id를 선택해 주세요.</h3>
                        </div>
                    )}
                />
                <Route path={`${this.props.match.url}/:id`} component={Item}/>
            </div>
        )
    }
}

class Item extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.match.params.id}</h3>
            </div>
        )
    }
}

export class Main extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>애플리케이션 골라주세요.</h2>
                </div>
                <div>
                    <Button variant="info"><Link to="/user">투두</Link></Button>
                    <Button variant="success">게시판</Button>
                </div>
            </div>
        )
    }
}

export class User extends Component {

    state = {
        selectedId: -1,
        data: null
    }

    async componentDidMount() {
        //fetch
        let obj = await axios.get('https://koreanjson.com/users');
        this.setState({
            data: obj.data
        })
    }

    selectId = (id) => {
        this.setState({
            selectedId: id
        })
    }

    goBack = () => {
        this.props.history.goBack();
    }


    render() {
        let listItem = null;
        let li_class = '';
        if (this.state.data) {
            listItem = this.state.data.map((user, i) => {
                li_class = (i + 1 === this.state.selectedId) ? "active" : "";
                //왜냐하면 맨위가 0번이야 유저리스트
                return <ListGroup.Item className={li_class} key={user.id} onClick={() => {
                    console.log(user.id);
                    this.selectId(user.id)
                }}>{user.name}</ListGroup.Item>;
            });
        }


        return (
            <div>
                <div>
                    <Button variant="success"><Link to="/">Home</Link></Button>
                </div>
                <div>
                    <ListGroup>
                        <ListGroup.Item>유저리스트</ListGroup.Item>
                        {listItem}
                    </ListGroup>
                </div>
                <div>
                    <Button variant="info"><Link to={`/user:${this.state.selectedId}`}>>선택</Link></Button>
                    <Button variant="success" onClick={this.goBack}>뒤로가기</Button>
                </div>

            </div>
        )
    }
}

export class SelectedUser extends Component {

    state = {
        selectIdx: 0, // 시작은 무조건 유저 프로필
        id: -1,
        data: null
    }

    async componentDidMount() {
        //fetch
        let id = this.props.match.params.id;
        id = id.substring(1);
        let obj = await axios.get('https://koreanjson.com/users/' + id);
        this.setState({
            data: obj.data,
            id: obj.data.id
        })
    }

    goBack = () => {
        this.props.history.goBack();
    }


    render() {

        let TableRow = null;
        let imgRendering = -1;
        if (this.state.data) {
            imgRendering = (<img src={`https://randomuser.me/api/portraits/men/${this.state.data.id}.jpg`}/>)
            TableRow =  (
                <tr>
                    <td>{this.state.data.name}</td>
                    <td>{this.state.data.email}</td>
                    <td>{this.state.data.phone}</td>
                </tr>
            )

        }

        return (
            <div>
                <div>
                    <ListGroup>
                        <ListGroup.Item>유저프로필</ListGroup.Item>
                        <ListGroup.Item>투두</ListGroup.Item>
                    </ListGroup>
                </div>
                <div>
                    <Button variant="success"><Link to="/">Home</Link></Button>
                    <Button variant="success" onClick={this.goBack}>뒤로가기</Button>
                </div>
                <div>
                    {imgRendering = imgRendering === -1 ?  ' ' : imgRendering}
                    <div>
                        <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>이름</th>
                                <th>이메일</th>
                                <th>모바일</th>
                            </tr>
                            </thead>
                            <tbody>
                            {TableRow}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}