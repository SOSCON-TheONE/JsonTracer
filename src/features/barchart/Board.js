import React, { Component } from 'react';
import styled from "styled-components";
import Ruler from "./Ruler";
import Detail from "./Detail";
import Level from "./Level";

// ================= style ======================= //
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