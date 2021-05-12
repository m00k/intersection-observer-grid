import { resolve } from "path";

export default {
	webpack(config, env, helpers, options) {
		const appFolder = resolve(
			process.cwd(),
			'src',
			'app',
		)
			
		config.module.rules[4].include.push(appFolder)
		config.module.rules[5].exclude.push(appFolder)
		config.output.publicPath = ''
		// console.log(config.module.rules[4])
		// console.log(config.module.rules[5])
		// console.log(config.module.rules[4].use[0].options)
		// console.log(config.module.rules[5].use[0].options)
		// process.exit()
	}
};