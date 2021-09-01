import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Ruler extends React.Component {

    addGraduation(){
        const ruler = document.querySelector('.ruler')
        const cnt = 100
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
            <div className="ruler">
            </div>
        );
    }
}

class Bar extends React.Component {

    constructor(props) {
        super(props); // 생성자를 가질 때 반드시 작성해야 함
        this.state = {
            idx: props.idx,
            start: props.idx*10,
            duration: props.duration,
        };
    }

    addStyle(){
        const bars = document.querySelectorAll(`.bar-${this.state.idx}`)
        bars.forEach(bar => {
            bar.style.position = 'absolute'
            bar.style.textAlign = 'center'
            bar.style.top = '0%'
            bar.style.left = `${this.state.start}%`
            bar.style.height = '20px'
            bar.style.width = `${this.state.duration}%`
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
                OP-{this.state.idx}
            </div>
        );
    }
}

class DataBar extends React.Component {
    renderBar(i) {
        return <Bar idx={ i } duration={ 5 }/>;
    }

    render() {
        return (
            <div className="data-bar">
                {this.renderBar(0)}
                {this.renderBar(1)}
                {this.renderBar(2)}
                {this.renderBar(3)}
                {this.renderBar(4)}
                {this.renderBar(5)}
            </div>
        );
    }
}

class Board extends React.Component {
    render() {
        return (
        <div className="borad">
            <div className="left-side">
                <div className="top-blank"></div>
                <div className="title">Level 1</div>
                <div className="title">Level 2</div>
            </div>
            <div className="content">
                <Ruler/>
                <DataBar/>
                <DataBar/>
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
