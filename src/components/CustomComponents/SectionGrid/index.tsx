import React from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";

interface SectionGridProps {
  children: React.ReactNode;
}

export default function SectionGrid(props: SectionGridProps) {
  return (
    <Grid sx={{
        overflowY: 'auto',
        maxHeight: 'calcLength(100vh-455px)',
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent',
      }}>
        {props.children}
    </Grid>
  );
}