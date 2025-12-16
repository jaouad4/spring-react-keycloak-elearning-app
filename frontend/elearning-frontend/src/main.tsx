import ReactDOM from 'react-dom/client';
import './index.css';
import { keycloak } from './keycloak';
import App from './App';

async function bootstrap() {
    try {
        const authenticated = await keycloak.init({
            onLoad: 'login-required',
            checkLoginIframe: true,
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            pkceMethod: 'S256',
        });

        if (!authenticated) {
            await keycloak.login();
            return;
        }

        // Gestion refresh périodique
        const scheduleRefresh = () => {
            setInterval(async () => {
                try {
                    await keycloak.updateToken(20);
                } catch {
                    // Changed 'catch (e)' to just 'catch' to fix ESLint error
                    keycloak.clearToken();
                    await keycloak.login();
                }
            }, 10000);
        };
        scheduleRefresh();

        // Added '!' to root element get to fix possible null TS error
        ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
    } catch (e) {
        console.error('Keycloak init failed', e);
    }
}

void bootstrap();