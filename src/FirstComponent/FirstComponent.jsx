import LoginComponent from '../LoginComponent/LoginComponent.jsx';
import SignInComponent from '../SignInComponent/SignInComponent.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PlaceHomeComponent from '../PlaceHomeComponent/PlaceHomeComponent.jsx';

/**
 * 첫 화면 - LoginComponent or SignInComponent
 */
function FirstComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/signin" element={<SignInComponent />} />
        <Route path="/place/:id" element={<PlaceHomeComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default FirstComponent;
