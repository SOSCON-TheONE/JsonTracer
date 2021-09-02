import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import styled from "styled-components";

// ================= style ======================= //
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

const StyledBargraduation = styled.div`
    top: 0%;
    left: ${(props) => props.i/props.cnt*100}%; 
    position: absolute;
    height: 100%;
    width: 0.5px;
    background-color: rgb(204, 204, 204);
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
    background-color: ${(props) => 'rgb(' + props.start*5156%255 + ',' + props.duration*356%255 +',' + ((props.start + props.duration)*35156%255) + ')'} // 수정 예정
`;

const ZoomInOut = styled.div`
    width: ${(props) => props.ratio || 100}%;
`;


// ================= component ======================= //
class Ruler extends React.Component {
    render() {
        const mapToRulergraduation = () => { // 줄자 눈금 반복 랜더링
            const result = [];
            for(let i=0; i<this.props.rulerCnt*10+1; i++){
                result.push(<StyledRulergraduation i={i} cnt={this.props.rulerCnt*10} key={i}/>)
            }
            return result
        }

        return (
            <div className="ruler-container">
                <div className="ruler-blank"></div>
                <div className="ruler">
                    {mapToRulergraduation()}
                </div>
            </div>
        );
    }
}

class Bar extends React.Component {
    clickBar(){
        const info = {
            'idx': this.props.idx,
            'start': this.props.start, 
            'duration': this.props.duration,
        }
        this.props.clickBar(info)
    }

    render() {
        return (
            <StyledBar 
                onClick={() => this.clickBar()} 
                start={this.props.start} 
                duration={this.props.duration} 
                cnt={this.props.cnt}>
                <div className="bar-title">OP-{this.props.idx}</div>
            </StyledBar>
        );
    }
}

class DataBar extends React.Component {
    renderBar(i) {
        return <Bar clickBar={this.props.clickBar} idx={ i*10 } start={i*10} duration={ 5 } cnt={this.props.rulerCnt}/>;
    }

    render() {
        const mapToBarGraduation = () => {
            const result = [];
            for(let i=0; i<this.props.rulerCnt; i++){
                result.push(<StyledBargraduation i={i} cnt={this.props.rulerCnt} key={i}/>)
            }
            return result
        }

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
                        {mapToBarGraduation()}
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
    }

    state = {
        isPannelOpen: true,
    }

    handleLevelClick(){
        this.setState({isPannelOpen: !this.state.isPannelOpen})
    }

    render() {
        // const rulerCnt = this.props.rulerCnt
        return (
            <div className="level-container">
                <header className="level-title" onClick={this.handleLevelClick}>
                    { this.state.isPannelOpen ? '▶' : '▼' } process level
                </header>
                { this.state.isPannelOpen ?
                    <div className="level-content">
                        <DataBar rulerCnt={this.props.rulerCnt} clickBar={this.props.clickBar}/>
                        <DataBar rulerCnt={this.props.rulerCnt} clickBar={this.props.clickBar}/>
                    </div>
                : ''}
            </div>
        );
    }
}

class Detail extends React.Component {
    renderDetail() {
        if (this.props.selectedOP) {
            return Object.keys(this.props.selectedOP).map((key) => {
                return  <div key={key}>{key} : {this.props.selectedOP[key]}</div>
            });
        } else {
            return <div>nothing is selected</div>
        }
    }

    render() {
        return (
            <div className="detail">
                <div className="title"><div>selected stuff</div></div>
                <div className="detail-content">
                    {this.renderDetail()}
                </div>
            </div>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.handleRulerCntClick = this.handleRulerCntClick.bind(this);
        this.clickBar = this.clickBar.bind(this);
    }

    state = {
        rulerCnt: 6,
        ratio: 100,
        selectedOP: null,
    }

    handleRulerCntClick(value){
        this.setState({ratio: this.state.ratio + value})
    }

    clickBar(info){
        this.setState({selectedOP: info})
    }

    render() {
        return (
        <div className="main-container">
            <div className="borad">
                <ZoomInOut ratio={this.state.ratio} className="content">
                    <Ruler rulerCnt={this.state.rulerCnt}/>
                    <Level rulerCnt={this.state.rulerCnt} clickBar={this.clickBar}/>
                    <Level rulerCnt={this.state.rulerCnt} clickBar={this.clickBar}/>
                    <Level rulerCnt={this.state.rulerCnt} clickBar={this.clickBar}/>
                </ZoomInOut>
            </div>
            <div>
                Zoom In/Out {this.state.ratio}%
                <button onClick={() => this.handleRulerCntClick(1)}>Zoom In +</button>
                <button onClick={() => this.handleRulerCntClick(-1)}>Zoom Out -</button>
            </div>
            <Detail selectedOP={this.state.selectedOP}/>
        </div>
        );
    }
}

// ========================================
ReactDOM.render(
    <Board />,
    document.getElementById('root')
);
