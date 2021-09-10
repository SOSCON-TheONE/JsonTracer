import React, { Component } from 'react';
import styled from "styled-components";

// ================= style ======================= //
const StyledRulergraduation = styled.div`
    position: absolute;
    left: ${(props) => props.i/props.cnt*100}%;
    bottom: 0%;
    width: 0.5px;
    height: 100%;
    background-color: var(--vscode-foreground);
    &:after {
        content: '${(props) => props.graduation}';
        margin-left: 3px;
        font-size: 10px;
    }
`;

class Ruler extends Component {
    calculateGraduation(graduation) {
        if (graduation >= 1000) {
            return graduation/1000 + 'ms'
        } else if (graduation >= 1) {
            return graduation + 'us'
        } else if (graduation === 0) {
            return 0
        } else {
            return graduation*1000 + 'ns'
        }
    }

    render() {
        const mapToRulergraduation = () => { // 줄자 눈금 반복 랜더링
            const result = [];
            for(let i=0; i<parseInt(this.props.calculatedEndTime/(10**(this.props.digit-1))); i++){
                result.push(<StyledRulergraduation
                                i={i}
                                cnt={parseInt(this.props.calculatedEndTime/(10**(this.props.digit-1)))}
                                graduation={this.calculateGraduation(i*(10**(this.props.digit-1)))}
                                key={i}/>)
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

export default Ruler;