import { CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const panelRef = useRef<HTMLDivElement>(null);

	const togglePanel = () => {
		setIsPanelOpen(!isPanelOpen);
	};

	// Закрытие панели при клике вне
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				panelRef.current &&
				!panelRef.current.contains(event.target as Node)
			) {
				setIsPanelOpen(false);
			}
		};

		if (isPanelOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isPanelOpen]);

	// Применение настроек
	const handleApply = (newSettings: ArticleStateType) => {
		setArticleSettings(newSettings);
		setIsPanelOpen(false);
	};

	// Сброс настроек
	const handleReset = () => {
		setArticleSettings(defaultArticleState);
		setIsPanelOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				ref={panelRef}
				isOpen={isPanelOpen}
				onToggle={togglePanel}
				currentSettings={articleSettings}
				defaultSettings={defaultArticleState}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
