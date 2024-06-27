import { Card } from "@mui/material";

interface BackCardProps {
  componentState: boolean;
  children: React.ReactNode;
}

export function BackCard( props : BackCardProps) {
    const { componentState } = props;
  return (
    <Card 
      sx={{ 
        p:componentState ? '2px':'none',  
        background: componentState ? 'linear-gradient(to right, rgba(86, 90, 151, 0.2), rgba(255, 123, 172, 1))': '', 
        borderRadius: 4, 
        border: '2px', 
        boxShadow:'none', }}
    >
        {props.children}
    </Card>
  );
}