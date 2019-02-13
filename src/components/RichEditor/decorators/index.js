import { CompositeDecorator } from 'draft-js';
import Prism from 'prismjs';
import PrismDraftDecorator from './PrismDraftDecorator';

export default new CompositeDecorator([new PrismDraftDecorator(Prism.languages.javascript)]);
