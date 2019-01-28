import styled from 'styled-components';
import Colors from '../atoms/colors';

export default styled.a`
  background: ${Colors.green500};
  border: 1px solid ${Colors.green700};
  color: white;
  padding: 1rem 5rem 1rem 5rem;
  border-radius: 0.5rem;

  :hover {
    background: ${Colors.green400};
    box-shadow: 0 4px 6px 0 rgba(47, 137, 50, 0.15);
    border: 1px solid ${Colors.green500};
  }
`;
