import { forwardRef, useState, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	currentSettings: ArticleStateType;
	defaultSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = forwardRef<
	HTMLDivElement,
	ArticleParamsFormProps
>(
	(
		{ isOpen, onToggle, currentSettings, defaultSettings, onApply, onReset },
		ref
	) => {
		const [formSettings, setFormSettings] =
			useState<ArticleStateType>(currentSettings);

		useEffect(() => {
			setFormSettings(currentSettings);
		}, [currentSettings]);

		// Обработчики изменений
		const handleFontFamilyChange = (
			selected: (typeof fontFamilyOptions)[0]
		) => {
			setFormSettings({ ...formSettings, fontFamilyOption: selected });
		};

		const handleFontSizeChange = (selected: (typeof fontSizeOptions)[0]) => {
			setFormSettings({ ...formSettings, fontSizeOption: selected });
		};

		const handleFontColorChange = (selected: (typeof fontColors)[0]) => {
			setFormSettings({ ...formSettings, fontColor: selected });
		};

		const handleBackgroundColorChange = (
			selected: (typeof backgroundColors)[0]
		) => {
			setFormSettings({ ...formSettings, backgroundColor: selected });
		};

		const handleContentWidthChange = (
			selected: (typeof contentWidthArr)[0]
		) => {
			setFormSettings({ ...formSettings, contentWidth: selected });
		};

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			onApply(formSettings);
		};

		const handleResetClick = () => {
			setFormSettings(defaultSettings);
			onReset();
		};

		return (
			<>
				<ArrowButton isOpen={isOpen} onClick={onToggle} />
				<aside
					ref={ref}
					className={`${styles.container} ${
						isOpen ? styles.container_open : ''
					}`}>
					<form className={styles.form} onSubmit={handleSubmit}>
						{/* Заголовок */}
						<div className={styles.titleWrapper}>
							<Text as='h2' size={31} weight={800} uppercase align='left'>
								ЗАДАЙТЕ ПАРАМЕТРЫ
							</Text>
						</div>

						{/* ШРИФТ — Select */}
						<Select
							title='ШРИФТ'
							options={fontFamilyOptions}
							selected={formSettings.fontFamilyOption}
							onChange={handleFontFamilyChange}
						/>

						{/* РАЗМЕР ШРИФТА — RadioGroup */}
						<RadioGroup
							title='РАЗМЕР ШРИФТА'
							name='fontSize'
							options={fontSizeOptions}
							selected={formSettings.fontSizeOption}
							onChange={handleFontSizeChange}
						/>

						{/* ЦВЕТ ШРИФТА — Select с цветными индикаторами */}
						<Select
							title='ЦВЕТ ШРИФТА'
							options={fontColors}
							selected={formSettings.fontColor}
							onChange={handleFontColorChange}
						/>

						<Separator />

						{/* ЦВЕТ ФОНА — Select с цветными индикаторами */}
						<Select
							title='ЦВЕТ ФОНА'
							options={backgroundColors}
							selected={formSettings.backgroundColor}
							onChange={handleBackgroundColorChange}
						/>

						{/* ШИРИНА КОНТЕНТА — Select с иконками */}
						<Select
							title='ШИРИНА КОНТЕНТА'
							options={contentWidthArr}
							selected={formSettings.contentWidth}
							onChange={handleContentWidthChange}
						/>

						{/* Кнопки */}
						<div className={styles.bottomContainer}>
							<Button
								title='СБРОСИТЬ'
								htmlType='reset'
								type='clear'
								onClick={handleResetClick}
							/>
							<Button title='ПРИМЕНИТЬ' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</>
		);
	}
);

ArticleParamsForm.displayName = 'ArticleParamsForm';
