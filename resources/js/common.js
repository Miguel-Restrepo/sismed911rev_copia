import {
    IconButton,
    InputBase,
    Paper,
    styled,
    Tooltip,
    tooltipClasses,
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import PropTypes from 'prop-types';

const common = {};

common.codgoPais = 'do';

common.key = 'd2eb62eb-5d9f-4c3f-95d2-47d5d9df934b';

common.BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

common.FilterComponent = ({ onClear, filterText, onFilter }) => (
    <Paper component="form" sx={{ mb: 2 }}>
        <InputBase
            value={filterText}
            onChange={onFilter}
            placeholder="Buscar"
            sx={{ ml: 1, flex: 1 }}
            inputProps={{ 'aria-label': 'buscar' }}
        />
        <IconButton onClick={onClear}>
            <ClearRoundedIcon />
        </IconButton>
    </Paper>
);

common.TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
};

common.TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

common.a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

common.customStyles = {
    headCells: {
        style: {
            color: 'white',
            fontSize: '14px',
            backgroundColor: '#40546a',
            borderRight: 'solid 1px white',
        },
    },
    rows: {
        style: {
            borderLeft: 'solid 1px rgba(0, 0, 0, .12)',
        },
        highlightOnHoverStyle: {
            outline: 'none',
            cursor: 'pointer',
            backgroundColor: 'rgb(230, 244, 244)',
        },
    },
    cells: {
        style: {
            padding: '16px',
            borderRight: 'solid 1px rgba(0, 0, 0, .12)',
            '& span': {
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
            },
        },
    },
};

common.conditionalRowStyles = [
    {
        when: (row) => row.toggleSelected,
        style: {
            color: 'white',
            userSelect: 'none',
            backgroundColor: '#1976d2',
        },
    },
];

common.paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

common.number_validate = (num) => {
    let suma = 0;
    let c = num.replace(/-/g, '');
    let number = c.substr(0, c.length - 1);

    const verificador = c.substr(c.length - 1, 1);

    if (num.length < 11) {
        return false;
    }
    for (let i = 0; i < number.length; i++) {
        let mod = 2;
        if (i % 2 == 0) mod = 1;
        let res = number.substr(i, 1) * mod;
        if (res > 9) {
            res = res.toString();
            const uno = res.substr(0, 1);
            const dos = res.substr(1, 1);
            res = eval(uno) + eval(dos);
        }
        suma += eval(res);
    }
    const el_numero = (10 - (suma % 10)) % 10;
    if (el_numero == verificador && number.substr(0, 3) != '000') {
        return true;
    }

    return false;
};

export default common;
