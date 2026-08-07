// File: src/components/CustomCheckbox.jsx
import React, { memo } from 'react';

const CustomCheckbox = ({ label, checked, onChange, disabled = false, name }) => {
    return (
        <label style={styles.wrapper}>
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                style={styles.checkbox}
            />
            <span style={styles.label}>{label}</span>
        </label>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        userSelect: 'none',
        fontSize: '14px',
        fontWeight: 600,
        color: '#080808',
    },
    checkbox: {
        width: '16px',
        height: '16px',
        cursor: 'pointer',
    },
    label: {
        lineHeight: 1.2,
    },
};

export default memo(CustomCheckbox);