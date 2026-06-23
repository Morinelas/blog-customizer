import { forwardRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentSettings: ArticleStateType;
	defaultSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = forwardRef<
	HTMLDivElement,
	ArticleParamsFormProps
>(({ currentSettings, defaultSettings, onApply, onReset }, ref) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(currentSettings);

	useEffect(() => {
		setFormSettings(currentSettings);
	}, [currentSettings]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				ref &&
				'current' in ref &&
				ref.current &&
				!ref.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, ref]);

	const togglePanel = () => {
		setIsOpen(!isOpen);
	};

	// Универсальный обработчик для всех полей
	const updateFormField =
		(field: keyof ArticleStateType) => (value: OptionType) => {
			setFormSettings((prev) => ({ ...prev, [field]: value }));
		};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formSettings);
		setIsOpen(false);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormSettings(defaultSettings);
		onReset();
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={togglePanel} />
			<aside
				ref={ref}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.titleWrapper}>
						<Text as='h2' size={31} weight={800} uppercase align='left'>
							ЗАДАЙТЕ ПАРАМЕТРЫ
						</Text>
					</div>

					<Select
						title='ШРИФТ'
						options={fontFamilyOptions}
						selected={formSettings.fontFamilyOption}
						onChange={updateFormField('fontFamilyOption')}
					/>

					<RadioGroup
						title='РАЗМЕР ШРИФТА'
						name='fontSize'
						options={fontSizeOptions}
						selected={formSettings.fontSizeOption}
						onChange={updateFormField('fontSizeOption')}
					/>

					<Select
						title='ЦВЕТ ШРИФТА'
						options={fontColors}
						selected={formSettings.fontColor}
						onChange={updateFormField('fontColor')}
					/>

					<Select
						title='ЦВЕТ ФОНА'
						options={backgroundColors}
						selected={formSettings.backgroundColor}
						onChange={updateFormField('backgroundColor')}
					/>

					<Select
						title='ШИРИНА КОНТЕНТА'
						options={contentWidthArr}
						selected={formSettings.contentWidth}
						onChange={updateFormField('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='СБРОСИТЬ' htmlType='reset' type='clear' />
						<Button title='ПРИМЕНИТЬ' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
});

ArticleParamsForm.displayName = 'ArticleParamsForm';
