import { useParams } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
    const params = useParams();
    // ...other hooks

    return (
        <WrappedComponent
            {...props}
            {...{ params,  }}
        />
    );
};

export default withRouter;