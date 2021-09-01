import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const ruleCnt = 6 // 0ms~60ms까지 보여주겠다는 뜻

class Ruler extends React.Component {
    addGraduation(){
        const ruler = document.querySelector('.ruler')
        const cnt = ruleCnt*10
        for(let i=0; i<cnt+1; i++){
            let graduation = document.createElement('div')
            graduation.className = `graduation-${i}`
            graduation.style.position = 'absolute'
            graduation.style.left = `${i/cnt*100}%`
            graduation.style.bottom = '0%'
            if (i%10 === 0){
                graduation.style.width = '0.5px'
                graduation.style.height = '20px'
                graduation.style.backgroundColor = 'black'
                if (i<cnt) {
                    let graduationTitle = document.createElement('div')
                    graduationTitle.className = `graduation-title-${i}`
                    graduationTitle.innerText = `${i}ms`
                    graduationTitle.style.marginLeft = '3px'
                    graduationTitle.style.fontSize = '10px'
                    graduation.appendChild(graduationTitle)
                }
            } else {
                graduation.style.width = '0.5px'
                graduation.style.height = '5px'
                graduation.style.backgroundColor = 'gray'
            }
            ruler.append(graduation)
        }
    }

    componentDidMount() {
        this.addGraduation()
    }

    render() {
        return (
            <div className="ruler-container">
                <div className="ruler-blank"></div>
                <div className="ruler"></div>
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

    addStyle(){
        const bars = document.querySelectorAll(`.bar-${this.state.idx}`)
        bars.forEach(bar => {
            bar.style.position = 'absolute'
            bar.style.cursor = 'pointer'
            bar.style.textAlign = 'center'
            bar.style.top = '0%'
            bar.style.left = `${this.state.start/ruleCnt*10}%`
            bar.style.height = '100%'
            bar.style.width = `${this.state.duration/ruleCnt*10}%`
            bar.style.zIndex = '1'
            bar.style.backgroundColor = "#" + Math.round(Math.random() * 0xffffff).toString(16) // 랜덤색상 부여
            let rgb = 0
            bar.style.backgroundColor.replace('rgb', '').replace('(', '').replace(')', '').split(', ').forEach(ele => {
                rgb += (ele*1)
            });
            if (rgb >= 700) {
                bar.style.color = 'black'
            } else {
                bar.style.color = 'white'
            }
        })
        
    }

    componentDidMount() {
        this.addStyle()
    }

    render() {
        return (
            <div className={"bar-" + this.state.idx}>
                <div className="bar-title">OP-{this.state.idx}</div>
            </div>
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
