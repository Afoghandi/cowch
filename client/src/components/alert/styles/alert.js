import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ alertType }) => (alertType === 'danger' ? '#e50914' : '#4CAF50')};
    border-radius: 4px;
    font-size: 14px;
    margin: 0 0 16px;
    color: white;
    padding: 15px 20px;
    position: relative;
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 600px) {
        padding: 10px 15px;
        font-size: 12px;
    }
`;

export const CloseButton = styled.button`
    background: rgba(255, 255, 255, 0.3);  /* Semi-transparent background */
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 16px;
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;  /* Ensures the button is on top */
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.5);  /* Slightly brighter on hover */
    }

    &:focus {
        outline: none;
    }
`;
