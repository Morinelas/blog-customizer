import { CSSProperties, useState, useRef } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const panelRef = useRef<HTMLDivElement>(null);

	const handleApply = (newSettings: ArticleStateType) => {
		setArticleSettings(newSettings);
	};

	const handleReset = () => {
		setArticleSettings(defaultArticleState);
	};

	const settings = articleSettings || defaultArticleState;

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				ref={panelRef}
				currentSettings={settings}
				defaultSettings={defaultArticleState}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
