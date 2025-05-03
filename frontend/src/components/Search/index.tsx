import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment } from '@mui/material';
import styles from './styles.module.css';

interface SearchProps {
  onSearchChange: (value: string) => void;
}

export default function Search({ onSearchChange }: SearchProps) {
  return (
    <div className={styles.container}>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        fullWidth
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
