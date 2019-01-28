import React from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

export interface Props {
  contentLabel?: string;
  el?: Element;
  showModal: boolean;
  onClose?: () => void;
}

export default class Modal extends React.Component<Props, {}> {
  public el: any = React.createRef<HTMLDivElement>();
  public innerEl: any = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
    this.el = document.createElement('div');
    this.el.id = 'modal';
  }

  componentWillMount() {
    document.body.appendChild(this.el);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleClose = () => {
    const { onClose } = this.props;
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  handleKeyUp = (e: any) => {
    if (e.which === 27) {
      this.handleClose();
    }
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <StyledModal>
        <div className="modal-overlay" onClick={this.handleClose} />
        <div className="modal-container">
          <div className="modal-inner" ref={el => (this.innerEl = el)}>
            {children}
          </div>
        </div>
        <div className="modal-close-button">
        </div>
      </StyledModal>,
      document.getElementById(this.el.id),
    );
  }
}

const InnerIntroAnimation = keyframes`
  0% {
    transform: translateY(2rem);
  }
  100% {
    transform: translateY(0);
  }
`;

const OverlayIntroAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledModal = styled.div`
  overflow: hidden;
  z-index: 12;
  animation: ${OverlayIntroAnimation} 100ms forwards ease-out;

  &,
  .modal-overlay,
  .modal-container,
  .modal-close-button {
    position: fixed;
  }
  &,
  .modal-overlay,
  .modal-container {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .modal-overlay,
  .modal-overlay {
    background: rgba(46, 47, 58, 0.8);
  }
  .modal-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    pointer-events: none;
  }
  .modal-inner {
    min-width: 350px;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    overflow: auto;
    pointer-events: all;
    animation: ${InnerIntroAnimation} 133ms forwards ease-out;
    max-height: calc(100vh - 40px);
  }
  .modal-close-button {
    top: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    box-shadow: none;
    overflow: hidden;
  }
  .modal-close-button:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.33);
    transition: all 133ms ease-out;
  }
  .modal-close-button > button {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
