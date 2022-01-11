import { signIn, useSession } from 'next-auth/client'
import { toast } from 'react-toastify'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'

import styles from './styles.module.scss'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/dist/client/router'

export function SubscribeButton(){
	const [session] = useSession()
	const router = useRouter();

	async function handleSubscribe() {
		if (!session) {
			await signIn('github');
			return;
		}
		
		console.log(session)
		if (session.activeSubscription) {
			 await router.push('/posts');
			return;
		}

		// Criação da Checkout session
		try { 
			const response = await api.post('/subscribe')

			const { sessionId } = response.data;

			const stripe = await getStripeJs()

			await stripe.redirectToCheckout({sessionId})
		} catch (err) {
			toast.dark(`🦄 Wow deu Erro! ${err.message}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				});
		}

	}

	return(
		<>
			<button 
				type="button" 
				className={styles.subscribeButton}
				onClick={handleSubscribe}
			>
				Subscribe Now
			</button>
		</>
	)
}
