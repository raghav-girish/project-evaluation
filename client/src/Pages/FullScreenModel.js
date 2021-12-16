import React, { Component } from "react";
import { Typography, Toolbar, IconButton,  Slide, AppBar,Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
const styles = theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        flex: 1
    },       
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class FullScreenModel extends Component {      
    render() {
        const { classes } = this.props;
        const comp = this.props.component;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    TransitionComponent={Transition}
                >
                    <AppBar position="sticky" style={{ marginBottom: 20 }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={() => this.props.handleClose()}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {this.props.title}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {comp}
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(FullScreenModel);


