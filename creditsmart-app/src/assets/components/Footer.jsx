import React from 'react'

// Footer simple: muestra copyright
// Comentario: componente pequeño y reutilizable, lo colocamos fuera del router.
export default function Footer(){
	return (
		<footer className="bg-light py-4 mt-auto">
			<div className="container text-center">
				<small>© {new Date().getFullYear()} CreditSmart. Todos los derechos reservados.</small>
			</div>
		</footer>
	)
}
