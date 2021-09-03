import React, { Component } from 'react';
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
    background-color: ${(props) => 'rgb(' + (props.name.charCodeAt(0)+110) + ',' + props.name.charCodeAt(parseInt(props.name.length/5))*4%255 +',' + (props.name.charCodeAt(props.name.length-1)*4)%255 + ')'} // 수정 예정
`;

const ZoomInOut = styled.div`
    width: ${(props) => props.ratio || 100}%;
`;


// ================= component ======================= //
class Ruler extends Component {
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

class Bar extends Component {
    clickBar(){
        const info = {
            ...this.props.data
        }
        this.props.clickBar(info)
    }

    render() {
        return (
            <StyledBar 
                className="bar"
                onClick={() => this.clickBar()} 
                start={this.props.data.ts/1000} 
                duration={this.props.data.dur/1000} 
                cnt={this.props.cnt}
                name={this.props.data.name}>
                <div className="bar-title">{this.props.data.name}</div>
            </StyledBar>
        );
    }
}

class DataBar extends React.Component {
    renderBar() {
        return this.props.data.map((ele) => {
            return  <Bar clickBar={this.props.clickBar} data={ele} cnt={this.props.rulerCnt} key={`${ele.name}-${ele.ts}`}/>
        });
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
                <header className="data-bar-title"><div>{ this.props.categoryName }</div></header>
                <div className="data-bar">
                    {this.renderBar()}
                    <div className="graduation">
                        {mapToBarGraduation()}
                    </div>
                </div>
            </div>
        );
    }
}

class Level extends Component {
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

    renderDataBar() {
        return Object.keys(this.props.data).map((key) => {
            return  <DataBar categoryName={key} data={this.props.data[key]} key={key} rulerCnt={this.props.rulerCnt} clickBar={this.props.clickBar}/>
        });
    }

    render() {
        // const rulerCnt = this.props.rulerCnt
        return (
            <div className="level-container">
                <header className="level-title" onClick={this.handleLevelClick}>
                    { this.state.isPannelOpen ? '▶' : '▼' } { this.props.processName }
                </header>
                { this.state.isPannelOpen ?
                    <div className="level-content">
                        { this.renderDataBar() }
                    </div>
                : ''}
            </div>
        );
    }
}

class Detail extends Component {
    renderArgs(value){
        return Object.keys(value).map((key) => {
            console.log(key, value[key])
            return <div className="arg" key={key}>ㄴ{key} : {value[key]}</div>
        })
    }

    renderDetail() {
        if (this.props.selectedOP) {
            return Object.keys(this.props.selectedOP).map((key) => {
                if (key === 'args') {
                    return  <div className="args" key={key}>{key} {this.renderArgs(this.props.selectedOP[key])}</div>
                } else {
                    return  <div key={key}>{key} : {this.props.selectedOP[key]}</div>
                }
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

class Board extends Component {
    constructor(props) {
        super(props);
        this.handleRulerCntClick = this.handleRulerCntClick.bind(this);
        this.handleRulerCntMultipleClick = this.handleRulerCntMultipleClick.bind(this);
        this.clickBar = this.clickBar.bind(this);
        this.openFileSelector = this.openFileSelector.bind(this);
        this.processFile = this.processFile.bind(this);
        this.processData = this.processData.bind(this);
    }

    state = {
        rulerCnt: 6,
        ratio: 100,
        selectedOP: null,
        fileName: null,
        data: null,
        MaxEndTime: null,
    }

    handleRulerCntClick(value){
        this.setState({ratio: this.state.ratio + value})
    }

    handleRulerCntMultipleClick(value){
        this.setState({ratio: this.state.ratio * value})
    }

    clickBar(info){
        this.setState({selectedOP: info})
    }

    openFileSelector(){
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "text/plain";
        input.onchange = (event) => {
            this.setState({fileName: event.target.files[0].name})
            this.processFile(event.target.files[0]);
        };
        input.click();
    }

    processFile(file) {
        const reader = new FileReader();
        reader.onload = () => {
            const data = JSON.parse(reader.result).traceEvents
            this.processData(data)
        }
        reader.readAsText(file, /* optional */ "euc-kr");
    }

    processData(data) {
        const processedData = {}
        let MaxEndTime = 0
        data.forEach(ele => {
            if(!ele.pid) { return }
            processedData[ele.pid] = processedData[ele.pid] ? processedData[ele.pid] : {}
            if (processedData[ele.pid][ele.tid]) {
                processedData[ele.pid][ele.tid].push(ele)
            } else {
                processedData[ele.pid][ele.tid] = []
                processedData[ele.pid][ele.tid].push(ele)
            }
            
            if (ele.ts + ele.dur > MaxEndTime){ // time range 구하기
                MaxEndTime = ele.ts + ele.dur
            }
        })
        MaxEndTime = Math.ceil(MaxEndTime/10000)
        this.setState({rulerCnt: MaxEndTime})
        this.setState({data: processedData})
    }

    renderLevel() {
        return Object.keys(this.state.data).map((key) => {
            return  <Level processName={key} data={this.state.data[key]} key={key} rulerCnt={this.state.rulerCnt} clickBar={this.clickBar}/>
        });
    }

    render() {
        return (
        <div className="main-container">
            <nav>
                <button>Record</button>
                <button>Save</button>
                <button onClick={() => this.openFileSelector()}>Load</button>
                <div className="file-name"><div>{this.state.fileName}</div></div>
            </nav>
            <div className="board">
                {this.state.data? 
                    <ZoomInOut ratio={this.state.ratio} className="content">
                        <Ruler rulerCnt={this.state.rulerCnt}/>
                        {this.renderLevel()}
                    </ZoomInOut>
                : ''}
            </div>
            <div>
                Zoom In/Out {this.state.ratio}%
                <button onClick={() => this.handleRulerCntClick(50)}>Zoom In +</button>
                <button onClick={() => this.handleRulerCntClick(-50)}>Zoom Out -</button>
                <button onClick={() => this.handleRulerCntMultipleClick(2)}>Zoom In *2</button>
                <button onClick={() => this.handleRulerCntMultipleClick(0.5)}>Zoom Out /2</button>
            </div>
            <Detail selectedOP={this.state.selectedOP}/>
        </div>
        );
    }
}

export default Board;