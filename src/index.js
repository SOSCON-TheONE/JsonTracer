import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import styled from "styled-components";

const ruleCnt = 6 // 0ms~60ms까지 보여주겠다는 뜻

// ================= style =======================
const StyledRulergraduation = styled.div`
    position: absolute;
    left: ${(props) => props.i/props.cnt*100}%;
    bottom: 0%;
    width: 0.5px;
    height: ${(props) => props.i%10 === 0? 100 : 25}%;
    background-color: ${(props) => props.i%10 === 0? 'black' : 'gray'};
    &:after {
        content: '${(props) => props.i%10 === 0 && props.i<props.cnt ? props.i+'ms' : ''}';
        margin-left: 3px;
        font-size: 10px;
    }
`;

const StyledBar = styled.div`
    position: absolute;
    cursor: pointer;
    text-align: center;
    top: 0%;
    left: ${(props) => props.start/props.cnt*10}%;
    height: 100%;
    width: ${(props) => props.duration/props.cnt*10}%; 
    z-index: 1;
    background-color: ${(props) => 'rgb(' + props.start*5156%255 + ',' + props.duration*356%255 +',' + ((props.start + props.duration)*35156%255) + ')'}
`;


// ================= component =======================
class Ruler extends React.Component {
    render() {
        const mapToGraduation = () => {
            const result = [];
            for(let i=0; i<ruleCnt*10+1; i++){
                result.push(<StyledRulergraduation i={i} cnt={ruleCnt*10} key={i}/>)
            }
            return result
        }

        return (
            <div className="ruler-container">
                <div className="ruler-blank"></div>
                <div className="ruler">
                    {mapToGraduation()}
                </div>
            </div>
        );
    }
}

class Bar extends React.Component {
    constructor(props) {
        super(props); // 생성자를 가질 때 반드시 작성해야 함
        this.state = {
            idx: props.idx,
            start: props.idx,
            duration: props.duration,
        };
    }

    render() {
        return (
            <StyledBar start={this.state.start} duration={this.state.duration} cnt={ruleCnt}>
                <div className="bar-title">OP-{this.state.idx}</div>
            </StyledBar>
        );
    }
}

class DataBar extends React.Component {
    renderBar(i) {
        return <Bar idx={ i*10 } duration={ 5 }/>;
    }

    addGraduation(){
        const graduations = document.querySelectorAll('.data-bar .graduation')
        const cnt = ruleCnt
        graduations.forEach(graduation => {
            for(let i=1; i<cnt; i++){
                let scale = document.createElement('div')
                scale.className = 'scale'
                scale.style.top = '0%'
                scale.style.left = `${i/ruleCnt*100}%`
                scale.style.position = 'absolute'
                scale.style.height = '100%'
                scale.style.width = '0.5px'
                scale.style.backgroundColor = 'rgb(204, 204, 204)'
                graduation.append(scale)
            }
        })
    }

    componentDidMount() {
        this.addGraduation()
    }

    render() {
        return (
            <div className="data-bar-container">
                <header className="data-bar-title"><div>category</div></header>
                <div className="data-bar">
                    {this.renderBar(0)}
                    {this.renderBar(1)}
                    {this.renderBar(2)}
                    {this.renderBar(3)}
                    {this.renderBar(4)}
                    {this.renderBar(5)}
                    <div className="graduation">
                    </div>
                </div>
            </div>
        );
    }
}

class Level extends React.Component {
    constructor(props) {
        super(props);
        this.handleLevelClick = this.handleLevelClick.bind(this);
        this.state = {isPannelOpen: true};
    }

    handleLevelClick(){
        this.setState({isPannelOpen: !this.state.isPannelOpen})
    }

    render() {
        return (
            <div className="level-container">
                <header className="level-title" onClick={this.handleLevelClick}>
                    { this.state.isPannelOpen ? '▶' : '▼' } process level
                </header>
                { this.state.isPannelOpen ?
                    <div className="level-content">
                        <DataBar/>
                        <DataBar/>
                    </div>
                : ''}
            </div>
        );
    }
}

class Board extends React.Component {
    render() {
        return (
        <div className="borad">
            <div className="content">
                <Ruler/>
                <Level/>
                <Level/>
                <Level/>
            </div>
        </div>
        );
    }
}

// ========================================
ReactDOM.render(
    <Board />,
    document.getElementById('root')
);
