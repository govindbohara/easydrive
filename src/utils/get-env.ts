export const getEnv = (variableName: string): string => {
	const env = process.env[variableName]
	if (!env) throw new Error(`Environment variable ${variableName} is not set`)
	return env
}
