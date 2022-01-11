import Stripe from 'stripe'
import { version } from '../../package.json'

//Stripe no backend = Usa chave de ambiente
export const stripe = new Stripe(
	process.env.STRIPE_API_KEY,
	{
		apiVersion: '2020-08-27',
		appInfo: {
			name: 'Ignews',
			version
		},
	}
)
