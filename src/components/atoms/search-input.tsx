import React from 'react';
import styled from 'styled-components';
import Colors from '../atoms/colors';

export interface Props {
  className?: string;
  placeholder?: string;
  value?: string;
  autoFocus?: boolean;
  onChange?: (e?: any) => void;
  onEnterKeyPress?: (e?: any) => void;
}

class SearchInput extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    placeholder: 'Search',
    autoFocus: false,
  };

  handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      const { onEnterKeyPress } = this.props;
      onEnterKeyPress && onEnterKeyPress(e);
   }
  }

  public render() {
    const { className, placeholder, value, onChange, autoFocus } = this.props;
    return (
      <div className={className}>
        <input
          type="text"
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

const StyledSearchInput = styled(SearchInput)`
  align-items: center;
  display: flex;
  width: 100%;
  position: relative;

  .search-icon {
    top: 8px;
    height: 1em;
    margin-left: 0.5rem;
    position: absolute;
    width: 1.5em;
  }

  input {
    border-radius: 2.25em;
    box-shadow: 0 0 0 1px ${Colors.grey300};
    padding: 0.625em 0.625em 0.625em 2.5em;
    transition: box-shadow 150ms ease;
    width: 100%;

    &::placeholder {
      color: ${Colors.green400};
    }

    &:focus {
      box-shadow: 0 0 0 1px ${Colors.green400};
      outline: none;
    }
  }
`;

export default StyledSearchInput;
