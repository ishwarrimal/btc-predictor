import React, { FC } from "react";
import styled, { css } from "styled-components";

// Define the possible types for the button
type ButtonType = "up" | "down";

// Props interface for the Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    direction: ButtonType;
}

// Define dynamic styles based on the button type
const buttonStyles = {
  up: css`
    background-color: #22c55e; /* Green for UP */
    &:hover {
      background-color: #16a34a; /* Darker green */
    }
  `,
  down: css`
    background-color: #ef4444; /* Red for DOWN */
    &:hover {
      background-color: #dc2626; /* Darker red */
    }
  `,
};

const StyledButton = styled.button<{ direction: ButtonType }>`
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  ${({ direction }) => buttonStyles[direction]} /* Apply styles based on type */
  
  &:disabled {
    background-color: #d1d5db; /* Gray for disabled state */
    cursor: not-allowed;
  }
`;

const Button: FC<ButtonProps> = ({ direction, children, ...rest }) => {
  return (
    <StyledButton direction={direction}  {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
