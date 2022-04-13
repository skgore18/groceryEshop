import { useNavigate } from 'react-router-dom';

export const Back = () => {
    let history = useNavigate();
    return (
        <>
          <button onClick={() => history.goBack()}>Back</button>
        </>
    );
};